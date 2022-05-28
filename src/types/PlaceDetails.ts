import type { Coordinate } from './Coordinate';

export interface PlaceDetails {
  name: string;
  placeId: string;
  coordinate: Coordinate;
  formattedAddress: string;
}
