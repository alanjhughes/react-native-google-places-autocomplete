import * as React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { Place } from 'src/types/GooglePlacesAutocompleteProps';

interface ResultItemProps {
  place: Place;
  onSelectPlace: (id: string, fullText: string) => void;
}

export function ResultItem({ place, onSelectPlace }: ResultItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.5 : 1 },
      ]}
      onPress={() => onSelectPlace(place.placeId, place.fullText)}
    >
      <Text style={styles.primary}>
        {place.primaryText}{' '}
        <Text style={styles.secondary}>{place.secondaryText}</Text>{' '}
      </Text>
    </Pressable>
  );
}

export function NoResults() {
  return (
    <View style={styles.container}>
      <Text>No results found for this address.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
