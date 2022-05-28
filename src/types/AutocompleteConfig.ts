import type { CountryCode } from './CountryCode';
import type { TypeFilter } from './TypeFilter';

export interface AutocompleteConfig {
  countries: CountryCode[];
  filter?: TypeFilter;
}
