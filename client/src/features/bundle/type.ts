export type Bundle = {
  id: number;
  title: string;
  description: string;
  rating: number;
  isPublic: boolean;
  userId: number;
  cityId: number;
};

export type BundlesState = {
  bundles: Bundle[];
  error: string | undefined;
};
