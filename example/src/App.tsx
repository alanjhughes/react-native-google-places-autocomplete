import * as React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { GooglePlacesAutocomplete } from '../../src/GooglePlacesAutocomplete';
import { API_KEY } from '@env';
import { PlaceDetails, PlacesError } from '../../src/types';

export default function App() {
  const onSearchError = React.useCallback((error: PlacesError) => {
    console.log(error);
  }, []);

  const onPlaceSelected = React.useCallback((place: PlaceDetails) => {
    console.log(place);
  }, []);

  return (
    <View style={styles.screen}>
      <View style={{ marginTop: Platform.OS === 'ios' ? 44 : 0 }}>
        <Text style={styles.title}>Google Places Autocomplete</Text>
        <GooglePlacesAutocomplete
          apiKey={API_KEY}
          requestConfig={{ countries: ['IE'] }}
          onPlaceSelected={onPlaceSelected}
          onSearchError={onSearchError}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    backgroundColor: 'rgba(211, 211, 211, 0.3)',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 10,
  },
});
