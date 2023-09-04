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


function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authChecUser());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/authorization" element={<AuthorizationPage />} />
          <Route path="/registration" element={<RegisterPage />} />
          <Route path="/map" element={<Map />} />
          <Route path="/cities/:cityId" element={<PlacesList />} />
          <Route path="/user/:userId" element={<UserPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
