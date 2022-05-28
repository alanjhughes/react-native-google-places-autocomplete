import * as React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  TextInputProps,
  TextInput,
  Pressable,
  Text,
} from 'react-native';
import { PlacesAutocomplete } from './RNPlacesAutocomplete';
import type { GooglePlacesAutocompleteProps } from './types/GooglePlacesAutocompleteProps';
import type { Place } from './types/Place';

const logo = require('./assets/powered_by_google_on_white.png');

interface SearchInputProps extends TextInputProps {
  inputValue: string;
  onChangeText: (text: string) => void;
}

const SearchInput = React.forwardRef<TextInput, SearchInputProps>(
  function Input({ inputValue, onChangeText, ...props }, ref) {
    return (
      <View style={searchStyles.container}>
        <TextInput
          {...props}
          ref={ref}
          defaultValue={inputValue}
          onChangeText={onChangeText}
          style={[
            searchStyles.textField,
            { marginRight: inputValue.length > 0 ? 5 : 0 },
          ]}
        />
      </View>
    );
  }
);

export function GooglePlacesAutocomplete({
  apiKey,
  placeholder,
  autoCompleteConfig,
  onPlaceSelected,
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

interface ResultItemProps {
  place: Place;
  onSelectPlace: (id: string, fullText: string) => void;
}

function ResultItem({ place, onSelectPlace }: ResultItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        resultItemStyles.container,
        { opacity: pressed ? 0.5 : 1 },
      ]}
      onPress={() => onSelectPlace(place.placeId, place.fullText)}
    >
      <Text style={resultItemStyles.primary}>
        {place.primaryText}{' '}
        <Text style={resultItemStyles.secondary}>{place.secondaryText}</Text>{' '}
      </Text>
    </Pressable>
  );
}

function Footer() {
  return (
    <View style={footerStyles.contianer}>
      <Image source={logo} style={footerStyles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  listStyle: {
    backgroundColor: 'white',
  },
});

const footerStyles = StyleSheet.create({
  contianer: {
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  logo: {
    width: 150,
    height: 20,
    resizeMode: 'contain',
  },
});

const searchStyles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textField: {
    backgroundColor: 'gainsboro',
    borderRadius: 5,
    flex: 1,
    padding: 10,
    fontSize: 18,
  },
});

const resultItemStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  primary: {
    fontSize: 16,
    fontWeight: '600',
  },
  secondary: {
    fontSize: 16,
    fontWeight: 'normal',
  },
});
