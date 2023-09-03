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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
