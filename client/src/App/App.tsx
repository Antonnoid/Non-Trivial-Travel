import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.scss';
// import Map from '../features/map/Map';
import {useSelector} from 'react-redux';
import Navbar from '../features/navbar/Navbar';
import MainPage from '../features/main/MainPage';
import AuthorizationPage from '../features/auth/AuthorizationPage';
import RegisterPage from '../features/auth/RegisterPage';
import {RootState, useAppDispatch} from '../redux/store';
import {authChecUser, stopPending} from '../features/auth/authSlice';
import Map from '../features/map/Map';
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
import RouteAddPage from '../features/routes/RouteAddPage';
import CityPage from '../features/city/CityPage';

import SwiperItem from '../features/swiper/SwiperItem';

import imgPrealoader from './prealoder.gif';
import logo from './logo.png';


function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const pending = useSelector((store: RootState) => store.auth.pending);
  console.log(pending);

  useEffect(() => {
    dispatch(authChecUser());
    dispatch(placesInit());
    dispatch(allPlacesInit());
    dispatch(allCitiesInit());
    dispatch(bundlesInit());
    dispatch(imagesInit());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(stopPending());
    }, 2000);
  }, [pending]);

  return (
    <BrowserRouter>

      {pending ? (
        <div className="prealoader__container">
          <img className="prealoader__logo" src={logo} alt="logo" />
          <img
            className="prealoader__prealoader"
            src={imgPrealoader}
            alt="prealoader"
          />
          <img className="prealoader__logo" src={logo} alt="logo" />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<MainPage />} />
            <Route path="/authorization" element={<AuthorizationPage />} />
            <Route path="/registration" element={<RegisterPage />} />
            <Route path="/map" element={<Map />} />
            <Route path="/cities/:cityId" element={<CityPage />} />
            <Route path="/user/:userId" element={<UserPage />} />
            <Route path="/places/:placeId" element={<PlacePage />} />
            <Route path="/bundles/:bundleId" element={<BundlePage />} />
            <Route path="/bundles/add" element={<BundleAddPage />} />
            <Route path="/routes/add" element={<RouteAddPage />} />
            <Route path="/routes/:routeId" element={<RoutePage />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
