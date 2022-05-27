import * as React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PlacesAutocomplete from 'react-native-places-autocomplete';

import type {
  Place,
  RNPlacesAutocompleteProps,
} from 'src/types/RNPlacesAutocompleteProps';
import { Footer } from './Footer';
import { ResultItem } from './ResultItem';
import { SearchInput } from './SearchInput';

export function GooglePlacesAutocomplete({
  apiKey,
  placeholder,
  autoCompleteConfig,
  onPlaceSelected,
  ...props
}: RNPlacesAutocompleteProps) {
  const [inputValue, setInputValue] = React.useState('');
  const [results, setResults] = React.useState<Place[]>([]);

  React.useEffect(() => {
    PlacesAutocomplete.initPlaces(apiKey);
  }, [apiKey]);

  const onSelectPlace = React.useCallback(
    async (placeId: string, fullText: string) => {
      try {
        const details = await PlacesAutocomplete.placeDetails(placeId);
        setInputValue(fullText);
        setResults([]);
        onPlaceSelected(details);
      } catch (e) {
        console.log(e);
      }
    },
    [onPlaceSelected]
  );

  const onChangeText = React.useCallback(
    (text: string) => {
      PlacesAutocomplete.findPlaces(text, autoCompleteConfig, setResults);
      setInputValue(text);
    },
    [autoCompleteConfig]
  );

  return (
    <View {...props.style} {...props}>
      <SearchInput
        ref={props.inputRef}
        inputValue={inputValue}
        onChangeText={onChangeText}
        placeholder={placeholder || 'Search for your address'}
        clearButtonMode="while-editing"
      />

      <FlatList
        data={results}
        contentContainerStyle={styles.listStyle}
        keyExtractor={(item) => item.placeId}
        ListFooterComponent={results.length > 0 ? Footer : undefined}
        renderItem={({ item }) => (
          <ResultItem place={item} onSelectPlace={onSelectPlace} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listStyle: {
    backgroundColor: 'white',
  },
});
