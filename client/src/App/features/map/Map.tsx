import React, {useEffect} from 'react';
import {load} from '@2gis/mapgl';
import MapWrapper from './MapWrapper';

export default function Map(): JSX.Element {
  useEffect(() => {
    let map: any;
    let userCoords: [number, number];
    const getUserLocation = async (): Promise<void> => {
      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          }
        );

        const {latitude, longitude} = position.coords;
        userCoords = [latitude, longitude];

        load().then((mapglAPI) => {
          map = new mapglAPI.Map('map-container', {
            center: userCoords,
            zoom: 13,
            key: '8563acc2-a9f4-46cb-bf6c-ca632a686b55',
          });
          if (userCoords) {
            // Добавляем маркер геопозиции пользователя, если координаты определены
            const circle = new mapglAPI.CircleMarker(map, {
              coordinates: userCoords,
              radius: 14,
              color: '#0088ff',
              strokeWidth: 4,
              strokeColor: '#ffffff',
              stroke2Width: 6,
              stroke2Color: '#0088ff55',
            });
          }
        });
      } catch (error) {
        console.log('Не удалось определить местоположение', error);
      }
    };

    getUserLocation();

    // Удаляем карту при размонтировании компонента
    return () => map && map.destroy();
  }, []);

  return (
    <div style={{width: '100%', height: '100%'}}>
      <MapWrapper />
    </div>
  );
}
