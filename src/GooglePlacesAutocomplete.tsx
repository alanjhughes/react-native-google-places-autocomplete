import * as React from 'react';
import { View } from 'react-native';
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
    <View {...props}>
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
    </View>
  );
}
