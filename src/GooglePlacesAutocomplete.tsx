import * as React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ResultItem, SearchInput, ListFooter } from './components';
import { PlacesAutocomplete } from './RNPlacesAutocomplete';
import type { GooglePlacesAutocompleteProps } from './types/GooglePlacesAutocompleteProps';
import type { Place } from './types/Place';

export function GooglePlacesAutocomplete({
  apiKey,
  placeholder,
  requestConfig,
  onPlaceSelected,
  inputRef,
  listStyle,
  resultItemStyle,
  ...props
}: GooglePlacesAutocompleteProps) {
  const [inputValue, setInputValue] = React.useState('');
  const [results, setResults] = React.useState<Place[]>([]);
  const resultListStyle = { ...defaultStyles.listStyle, ...listStyle };

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
      PlacesAutocomplete.findPlaces(text, requestConfig, setResults);
      setInputValue(text);
    },
    [requestConfig]
  );

  return (
    <View {...props.style} {...props}>
      <SearchInput
        ref={inputRef}
        inputValue={inputValue}
        onChangeText={onChangeText}
        placeholder={placeholder || 'Search for your address'}
        clearButtonMode="while-editing"
      />

      <FlatList
        data={results}
        contentContainerStyle={resultListStyle}
        keyExtractor={(item) => item.placeId}
        ListFooterComponent={results.length > 0 ? ListFooter : undefined}
        renderItem={({ item }) => (
          <ResultItem
            place={item}
            style={resultItemStyle}
            onSelectPlace={onSelectPlace}
          />
        )}
      />
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  listStyle: {
    backgroundColor: 'white',
  },
});
