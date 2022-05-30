# react-native-places-autocomplete

Google Places Autocomplete for React Native

## Installation

```sh
npm install react-native-gp-autocomplete
```

## Usage

```js
import { GooglePlacesAutocomplete } from 'react-native-gp-autocomplete';

// ...

<View>
  <GooglePlacesAutocomplete
    apiKey={API_KEY}
    autoCompleteConfig={{ countries: ['IE'] }}
    onPlaceSelected={(place) => {
      console.log(place);
    }}
  />
</View>;
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
