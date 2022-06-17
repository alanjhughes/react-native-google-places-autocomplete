import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { ResultItem, SearchInput, ListFooter } from './components';
import { PlacesAutocomplete } from './RNPlacesAutocomplete';
import type { PlacesError } from './types';
import type { GooglePlacesAutocompleteProps } from './types/GooglePlacesAutocompleteProps';
import type { Place } from './types/Place';

export function GooglePlacesAutocomplete({
  apiKey,
  placeholder,
  requestConfig,
  onPlaceSelected,
  onSearchError,
  inputRef,
  resultsContainerStyle,
  resultItemStyle,
  ...props
}: GooglePlacesAutocompleteProps) {
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
        const error = e as PlacesError;
        onSearchError?.(error);
      }
    },
    [onPlaceSelected, onSearchError]
  );

  const onResult = React.useCallback(
    (error, searchResults) => {
      if (error) {
        onSearchError?.(error);
        return;
      }
      setResults(searchResults);
    },
    [onSearchError]
  );

  const onChangeText = React.useCallback(
    async (text: string) => {
      PlacesAutocomplete.findPlaces(text, requestConfig, onResult);
      setInputValue(text);
    },
    [onResult, requestConfig]
  );

  return (
    <ScrollView {...props}>
      <SearchInput
        ref={inputRef}
        inputValue={inputValue}
        onChangeText={onChangeText}
        placeholder={placeholder || 'Search for your address'}
        clearButtonMode="while-editing"
      />
      {results.length > 0 ? (
        <View style={resultsContainerStyle}>
          {results.map((place) => (
            <ResultItem
              key={place.placeId}
              place={place}
              style={resultItemStyle}
              onSelectPlace={onSelectPlace}
            />
          ))}
          <ListFooter />
        </View>
      ) : null}
    </ScrollView>
  );
}
