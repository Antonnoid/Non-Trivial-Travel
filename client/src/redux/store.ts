/* eslint-disable import/no-extraneous-dependencies */
import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import authSlice from '../features/auth/authSlice';
import placesSlice from '../features/place/placesSlice';
import ImagesSlice from '../features/image/ImagesSlice';
import citiesSlice from '../features/navbar/citiesSlice';
import bundlesSlice from '../features/bundle/bundlesSlice';
import routesSlice from '../features/routes/routesSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    places: placesSlice,
    images: ImagesSlice,
    cities: citiesSlice,
    bundles: bundlesSlice,
    routes: routesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
export default store;
