import type { CountryCode } from './CountryCode';

export interface RNPlacesAutocompleteModule {
  initPlaces: (apikey: string) => void;
  findPlaces: (
    query: string,
    config?: AutocompleteConfig,
    callback?: (results: Place[]) => void
  ) => void;
  placeDetails: (placeId: String) => Promise<PlaceDetails>;
}

export type PlaceDetails = {
  name: string;
  placeId: string;
  coordinate: LatLng;
  formattedAddress: string;
};

export type Place = {
  primaryText: string;
  secondaryText: string;
  fullText: string;
  placeId: string;
  distance: number | null;
  types: string[];
};

export type LatLng = {
  latitude: number;
  longitude: number;
};

export type AutocompleteConfig = {
  countries: CountryCode[];
  filter?: TypeFilter;
};

export type TypeFilter =
  | 'geocode'
  | 'address'
  | 'establishment'
  | 'regions'
  | 'cities';
