import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import './App.scss';
// import Map from '../features/map/Map';
import Navbar from '../features/navbar/Navbar';
import MainPage from '../features/main/MainPage';
import Map from '../features/map/Map';
import PlacesList from '../features/place/PlacesList';
import PlacePage from '../features/place/PlacePage';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/map" element={<Map />} />
          <Route path="/cities/:cityId" element={<PlacesList />} />
          <Route path='places/:placeId' element={<PlacePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
