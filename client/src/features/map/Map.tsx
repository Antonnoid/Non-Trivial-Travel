import React, {useEffect} from 'react';

import MapWrapper from './MapWrapper';
import * as api from './api';
import {Coords} from './types/types';

export default function Map(): JSX.Element {
  // const [map, setMap] = useState(null);

  useEffect(() => {
    let map: any;
    let userCoords: Coords;
    const initializeMap = async (): Promise<any> => {
      try {
        userCoords = await api.getUserLocation();
        map = await api.initMap(userCoords);
      } catch (error) {
        console.log('Ошибка при инициализации карты', error);
      }
    };

    initializeMap();

    // Удаляем карту при размонтировании компонента
    return () => map && map.destroy();
  }, []);

  return (
    <div style={{width: '100%', height: '100%'}}>
      <MapWrapper />
    </div>
  );
}
