import * as React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { GooglePlacesAutocomplete } from '../../src/components/GooglePlacesAutocomplete';

export default function App() {
  return (
    <View style={styles.screen}>
      <View style={{ marginTop: Platform.OS === 'ios' ? 44 : 0 }}>
        <Text style={styles.title}>Google Places Autocomplete</Text>
        <GooglePlacesAutocomplete
          apiKey="API_KEY"
          autoCompleteConfig={{ countries: ['IE'] }}
          onPlaceSelected={(place) => {
            console.log(place);
          }}
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
