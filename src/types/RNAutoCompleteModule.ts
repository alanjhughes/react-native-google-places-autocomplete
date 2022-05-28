import type { AutocompleteConfig } from './AutocompleteConfig';
import type { Place } from './Place';
import type { PlaceDetails } from './PlaceDetails';

export interface RNPlacesAutocompleteModule {
  initPlaces: (apikey: string) => void;
  findPlaces: (
    query: string,
    config?: AutocompleteConfig,
    callback?: (results: Place[]) => void
  ) => void;
  placeDetails: (placeId: String) => Promise<PlaceDetails>;
}
