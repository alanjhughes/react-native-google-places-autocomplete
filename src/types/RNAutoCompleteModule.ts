import type { RequestConfig } from './RequestConfig';
import type { Place } from './Place';
import type { PlaceDetails } from './PlaceDetails';

export interface RNPlacesAutocompleteModule {
  initPlaces: (apikey: string) => void;
  findPlaces: (
    query: string,
    config?: RequestConfig,
    callback?: (results: Place[]) => void
  ) => void;
  placeDetails: (placeId: String) => Promise<PlaceDetails>;
}
