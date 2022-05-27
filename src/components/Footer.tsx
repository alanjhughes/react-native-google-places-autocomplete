import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const logo = require('../assets/powered_by_google_on_white.png');

export function Footer() {
  return (
    <View style={styles.contianer}>
      <Image source={logo} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
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
