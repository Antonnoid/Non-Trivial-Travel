export type Image = {
  id: number;
  url: string;
  placeId: number;
};

export type ImagesState = {
  images: Image[];
  error: string | undefined;
};
