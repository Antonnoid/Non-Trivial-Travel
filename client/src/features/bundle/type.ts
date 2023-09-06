import {Place} from '../place/type';

export type Bundle = {
  id: number;
  title: string;
  description: string;
  isPublic: boolean;
  userId: number;
  cityId: number;
  Bundle_places: BundlePlace[];
};

export type BundlesState = {
  bundles: Bundle[];
  error: string | undefined;
  pending: boolean;
};

export type BundlePlace = {
  id: number;
  bundleId: number;
  placeId: number;
  Place: Place[];
};
