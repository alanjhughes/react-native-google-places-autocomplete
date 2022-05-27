package com.reactnativeplacesautocomplete

import com.facebook.react.bridge.*
import com.google.android.libraries.places.api.Places
import com.google.android.libraries.places.api.model.AutocompleteSessionToken
import com.google.android.libraries.places.api.model.Place
import com.google.android.libraries.places.api.net.FetchPlaceRequest
import com.google.android.libraries.places.api.net.FindAutocompletePredictionsRequest
import com.google.android.libraries.places.api.net.PlacesClient

class PlacesAutocompleteModule(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {
  private lateinit var placesClient: PlacesClient
  private val token = AutocompleteSessionToken.newInstance()

  private val request =
    FindAutocompletePredictionsRequest.builder()
      .setSessionToken(token)

  override fun getName() = "PlacesAutocomplete"

  @ReactMethod
  fun initPlaces(apiKey: String) {
    Places.initialize(reactContext, apiKey)
    placesClient = Places.createClient(reactContext)
  }

  @ReactMethod
  fun findPlaces(query: String, params: ReadableMap?, callback: Callback) {
    request.query = query

    if (params != null) {
      val countries = params.getArray("countries")
      countries?.let {
        val result = mutableListOf<String>()
        for (i in 0 until it.size()) {
          result.add(it.getString(i))
        }
        request.countries = result
      }

      val filter = params.getString("filter")
      filter?.let {
        val typeFilter = mapToTypeFilter(it)
        request.typeFilter = typeFilter
      }
    } else {
      request.countries = emptyList()
      request.typeFilter = null
    }

    placesClient.findAutocompletePredictions(request.build())
      .addOnSuccessListener { response ->
        val results = response.autocompletePredictions.map { mapFromPrediction(it) }
        callback.invoke(mapToResultsArray(results))
      }
      .addOnFailureListener {
        callback.invoke("Prediction error", it)
      }
  }

  @ReactMethod
  fun placeDetails(placeId: String, promise: Promise) {
    val placeFields = listOf(
      Place.Field.ID,
      Place.Field.NAME,
      Place.Field.LAT_LNG,
      Place.Field.ADDRESS,
      Place.Field.ADDRESS_COMPONENTS
    )

    val request = FetchPlaceRequest.newInstance(placeId, placeFields)

    placesClient.fetchPlace(request)
      .addOnSuccessListener { response ->
        val place = response.place
        promise.resolve(mapFromPlace(place))
      }
      .addOnFailureListener { exception: Exception ->
        promise.reject("Error", exception)
      }
  }
}
