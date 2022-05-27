import type { TextInput, ViewProps } from 'react-native';
import type { CountryCode } from './CountryCode';

export type AutocompleteConfig = {
  countries: CountryCode[];
  filter?: TypeFilter;
};

export interface GooglePlacesAutocompleteProps extends ViewProps {
  apiKey: string;
  inputRef?: React.Ref<TextInput>;
  autoCompleteConfig?: AutocompleteConfig;
  placeholder?: string;
  onPlaceSelected: (details: PlaceDetails) => void;
}

export type LatLng = {
  latitude: number;
  longitude: number;
};

export type PlaceDetails = {
  name: string;
  placeId: string;
  coordinate: LatLng;
  formattedAddress: string;
};

export interface RNPlacesAutocompleteModule {
  initPlaces: (apikey: string) => void;
  findPlaces: (
    query: string,
    config?: AutocompleteConfig,
    callback?: (results: Place[]) => void
  ) => void;
  placeDetails: (placeId: String) => Promise<PlaceDetails>;
}

export type Place = {
  primaryText: string;
  secondaryText: string;
  fullText: string;
  placeId: string;
  distance: number | null;
  types: string[];
};

export type TypeFilter =
  | 'geocode'
  | 'address'
  | 'establishment'
  | 'regions'
  | 'cities';
