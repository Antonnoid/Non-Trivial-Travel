export type Place = {
  id: number;
  title: string;
  description: string;
  cityId: number;
  userId: number;
  bundleId: number;
  isPublic: boolean;
  atitude: number;
  longitude: number;
  images: Image[];
};
export type PlaceForAdd = {
  title: string;
  description: string;
  city: string;
};

export type Image = {
  id: number;
  url: string;
  placeId: number;
};

export type PlacesState = {
  places: Place[];
  allPlaces: Place[];
  error: string | undefined;
  pending: boolean;
};

export type PlaceId = number;

export type Rating = {
  id: number;
  rate: number;
  type: string;
  userId: number;
};
