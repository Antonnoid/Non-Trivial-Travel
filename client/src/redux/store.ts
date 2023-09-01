/* eslint-disable import/no-extraneous-dependencies */
import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import placesSlice from '../features/place/placesSlice';
import ImagesSlice from '../features/image/ImagesSlice';

const store = configureStore({
  reducer: {
    places: placesSlice,
    images: ImagesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
export default store;
