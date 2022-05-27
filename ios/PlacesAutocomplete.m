#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(PlacesAutocomplete, NSObject)

RCT_EXTERN_METHOD(initPlaces: (nonnull NSString *)apiKey)
RCT_EXTERN_METHOD(
                  findPlaces: (nonnull NSString *)query
                  withConfig: (NSDictionary *)params
                  callback: (RCTResponseSenderBlock) callback
                  )
RCT_EXTERN_METHOD(
                  placeDetails: (nonnull NSString *) id
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject
                  )

@end
