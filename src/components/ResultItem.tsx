import * as React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import type { Place } from '../types';

interface ResultItemProps {
  place: Place;
  onSelectPlace: (id: string, fullText: string) => void;
  style?: ViewStyle;
}

export function ResultItem({ place, onSelectPlace, style }: ResultItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        { ...defaultStyles.container, ...style },
        { opacity: pressed ? 0.5 : 1 },
      ]}
      onPress={() => onSelectPlace(place.placeId, place.fullText)}
    >
      <Text style={defaultStyles.primary}>
        {place.primaryText}{' '}
        <Text style={defaultStyles.secondary}>{place.secondaryText}</Text>{' '}
      </Text>
    </Pressable>
  );
}

const defaultStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10,
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
