import Foundation
import GooglePlaces
import React

@objc(PlacesAutocomplete)
class PlacesAutocomplete: NSObject {
    let token = GMSAutocompleteSessionToken.init()
    var fetcher: GMSAutocompleteFetcher!
    var callback: RCTResponseSenderBlock? = nil
    private let filter = GMSAutocompleteFilter()
    
    override init() {
        super.init()
        setup()
    }
    
    private func setup() {
        fetcher = GMSAutocompleteFetcher(filter: filter)
        fetcher.delegate = self
        fetcher.provide(token)
    }
    
    @objc(initPlaces:)
    public func initPlaces(apikey: String) {
        GMSPlacesClient.provideAPIKey(apikey)
    }
    
    @objc(findPlaces:withConfig:callback:)
    public func findPlaces(fromQuery: String, params: NSDictionary?, callback: RCTResponseSenderBlock?) {
        self.callback = callback
        
        if let params = params {
            let countries = params["countries"] as! [String]
            filter.countries = countries
            
            if let filterType = params["filterType"] as? String {
                filter.type = Mappers.mapToTypeFilter(field: filterType)
            } else {
                filter.type = .noFilter
            }
        } else {
            filter.countries = []
            filter.type = .noFilter
        }
        
        DispatchQueue.main.async { [weak self] in
            self?.fetcher.sourceTextHasChanged(fromQuery)
        }
    }
    
    @objc(placeDetails:resolver:rejecter:)
    public func placeDetails(id: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        let fields: GMSPlaceField = GMSPlaceField(rawValue: UInt(GMSPlaceField.name.rawValue) |
                                                            UInt(GMSPlaceField.placeID.rawValue) |
                                                            UInt(GMSPlaceField.coordinate.rawValue) |
                                                            UInt(GMSPlaceField.formattedAddress.rawValue) |
                                                            UInt(GMSPlaceField.addressComponents.rawValue)
        )
        DispatchQueue.main.async {
            GMSPlacesClient.shared().fetchPlace(fromPlaceID: id, placeFields: fields, sessionToken: nil) { place, error in
                if let error = error {
                    rejecter("Place not found", error.localizedDescription, nil)
                    return
                }
                
                if let place = place {
                    let result = Mappers.mapFromPlace(place: place)
                    resolver(result)
                }
            }
        }
    }
    
    @objc static func requiresMainQueueSetup() -> Bool {
        return false
    }
}

extension PlacesAutocomplete : GMSAutocompleteFetcherDelegate {
    
    func didAutocomplete(with predictions: [GMSAutocompletePrediction]) {
        if let callback = callback {
            callback([NSNull() ,Mappers.mapFromPredictions(predictions: predictions)])
        }
    }
    
    func didFailAutocompleteWithError(_ error: Error) {
        if let callback = callback {
            callback([error.localizedDescription, NSNull()])
        }
    }
}
