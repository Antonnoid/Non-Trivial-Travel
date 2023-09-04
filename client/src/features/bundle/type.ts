import { Place } from "../place/type";

export type Bundle = {
  id: number;
  title: string;
  description: string;
  rating: number;
  isPublic: boolean;
  userId: number;
  cityId: number;
  Bundle_places: BundlePlace[];
};

export type BundlesState = {
  bundles: Bundle[];
  error: string | undefined;
};

export type BundlePlace = {
  id: number;
  bundleId: number;
  placeId: number;
  Place: Place[];
}
