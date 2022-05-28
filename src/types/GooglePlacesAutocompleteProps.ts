import type { TextInput, ViewProps } from 'react-native';
import type { AutocompleteConfig } from './AutocompleteConfig';
import type { PlaceDetails } from './PlaceDetails';

export interface GooglePlacesAutocompleteProps extends ViewProps {
  apiKey: string;
  inputRef?: React.Ref<TextInput>;
  autoCompleteConfig?: AutocompleteConfig;
  placeholder?: string;
  onPlaceSelected: (details: PlaceDetails) => void;
}
