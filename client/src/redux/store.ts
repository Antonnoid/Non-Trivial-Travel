/* eslint-disable import/no-extraneous-dependencies */
import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import authSlice from '../features/auth/authSlice';
import placesSlice from '../features/place/placesSlice';
import ImagesSlice from '../features/image/ImagesSlice';
import citiesSlice from '../features/city/citiesSlice';
import bundlesSlice from '../features/bundle/bundlesSlice';
import routesSlice from '../features/routes/routesSlice';
import commentsPlaceSlice from '../features/comment/commentsPlaceSlice';
import commentsBundleSlice from '../features/comment/commentsBundleSlice';
import commentsRouteSlice from '../features/comment/commentsRouteSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    places: placesSlice,
    allPlaces: placesSlice,
    images: ImagesSlice,
    cities: citiesSlice,
    bundles: bundlesSlice,
    routes: routesSlice,
    commentsOfPlace: commentsPlaceSlice,
    commentsOfBundle: commentsBundleSlice,
    commentsOfRoute: commentsRouteSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
export default store;
