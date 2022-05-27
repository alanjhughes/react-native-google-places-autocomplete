package com.reactnativeplacesautocomplete

import com.facebook.react.bridge.*
import com.google.android.gms.maps.model.LatLng
import com.google.android.libraries.places.api.model.AutocompletePrediction
import com.google.android.libraries.places.api.model.Place
import com.google.android.libraries.places.api.model.TypeFilter

internal fun mapFromPlace(place: Place) = WritableNativeMap().apply {
  putString("name", place.name)
  putString("placeId", place.id)
  putMap("coordinate", mapFromCoordinate(place.latLng ?: null))
  putString("formattedAddress", place.address)
}


internal fun mapFromCoordinate(coordinate: LatLng?): WritableMap {
  val result = WritableNativeMap()
  return coordinate?.let {
    result.apply {
      putDouble("latitude", coordinate.latitude)
      putDouble("longitude", coordinate.longitude)
    }
    return result
  } ?: result
}

internal fun mapFromPrediction(prediction: AutocompletePrediction) = WritableNativeMap().apply {
  putString("primaryText", prediction.getPrimaryText(null).toString())
  putString("secondaryText", prediction.getSecondaryText(null).toString())
  putString("fullText", prediction.getFullText(null).toString())
  putString("placeId", prediction.placeId)
  putInt("distance", prediction.distanceMeters ?: 0)
  putArray("types", prediction.placeTypes.map { it.name } as? ReadableArray)
}


internal fun <T : WritableMap> mapToResultsArray(array: List<T>): WritableArray {
  val results = WritableNativeArray()
  array.forEach {
    results.pushMap(it)
  }
  return results
}

fun mapToTypeFilter(type: String) = when (type) {
  "geocode" -> TypeFilter.GEOCODE
  "address" -> TypeFilter.ADDRESS
  "cities" -> TypeFilter.REGIONS
  "regions" -> TypeFilter.REGIONS
  "establishment" -> TypeFilter.ESTABLISHMENT
  else -> null
}


