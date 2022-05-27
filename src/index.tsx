import { NativeModules, Platform } from 'react-native';
import type { RNPlacesAutocompleteInterface } from './types/RNPlacesAutocompleteProps';

const LINKING_ERROR =
  `The package 'react-native-places-autocomplete' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const PlacesAutocomplete = NativeModules.PlacesAutocomplete
  ? NativeModules.PlacesAutocomplete
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export default PlacesAutocomplete as RNPlacesAutocompleteInterface;
