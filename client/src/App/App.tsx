import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import './App.scss';
// import Map from '../features/map/Map';
import Navbar from '../features/navbar/Navbar';
import MainPage from '../features/main/MainPage';
import AuthorizationPage from '../features/auth/AuthorizationPage';
import RegisterPage from '../features/auth/RegisterPage';
import {useAppDispatch} from '../redux/store';
import {authChecUser} from '../features/auth/authSlice';
import Map from '../features/map/Map';
import PlacesList from '../features/place/PlacesList';
import UserPage from '../features/user/UserPage';
import PlacePage from '../features/place/PlacePage';
import BundlePage from '../features/bundle/BundlePage';
import Error from '../features/404/Error';
import {placesInit, allPlacesInit} from '../features/place/placesSlice';
import {bundlesInit} from '../features/bundle/bundlesSlice';
import {imagesInit} from '../features/image/ImagesSlice';
import BundleAddPage from '../features/bundle/BundleAddPage';
import RoutePage from '../features/routes/RoutePage';
import {allCitiesInit} from '../features/city/citiesSlice';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authChecUser());
    dispatch(placesInit());
    dispatch(allPlacesInit());
    dispatch(allCitiesInit());
    dispatch(bundlesInit());
    dispatch(imagesInit());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<MainPage />} />
          <Route path="/authorization" element={<AuthorizationPage />} />
          <Route path="/registration" element={<RegisterPage />} />
          <Route path="/map" element={<Map />} />
          <Route path="/cities/:cityId" element={<PlacesList />} />
          <Route path="/user/:userId" element={<UserPage />} />
          <Route path="/places/:placeId" element={<PlacePage />} />
          <Route path="/bundles/:bundleId" element={<BundlePage />} />
          <Route path="/bundles/add" element={<BundleAddPage />} />
          <Route path="/routes/:routeId" element={<RoutePage />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
