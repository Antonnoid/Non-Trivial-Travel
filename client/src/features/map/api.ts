/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import {load} from '@2gis/mapgl';
import {Coords} from './types/types';
import {APIkey} from './APIkey';

export const initMap = async (userCoords: [number, number]) => {
  try {
    const mapglAPI = await load();
    const map = new mapglAPI.Map('map-container', {
      center: userCoords.reverse(),
      zoom: 13,
      key: APIkey,
    });

    if (userCoords) {
      const marker = new mapglAPI.Marker(map, {
        coordinates: userCoords,
      });
      const marker2 = new mapglAPI.Marker(map, {
        coordinates: [59.565, 60.4543645], // Координаты второго маркера
      });
      const startPoint = {
        type: 'stop',
        lon: marker.getCoordinates()[0],
        lat: marker.getCoordinates()[1],
      };
      const endPoint = {
        type: 'stop',
        lon: marker2.getCoordinates()[0],
        lat: marker2.getCoordinates()[1],
      };

      const routeRequest = {
        points: [startPoint, endPoint],
        transport: 'car',
        route_mode: 'fastest',
        traffic_mode: 'jam',
      };
      const response = await fetch(`/api/2gis?key=${APIkey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(routeRequest),
      });

      if (response.ok) {
        const routeData = await response.json();
        const routeCoordinates = routeData.geometry.coordinates;
        const polyline = new mapglAPI.Polyline(map, {
          coordinates: routeCoordinates, // Укажите координаты маршрута
          width: 4, // Ширина линии маршрута
          color: '#FF0000', // Цвет линии маршрута
        });

        // Обработайте данные маршрута и отобразите их на карте
      } else {
        console.error(
          'Ошибка при запросе маршрута',
          response.status,
          response.statusText
        );
      }
    }

    return map;
  } catch (error) {
    console.log('Не удалось инициализировать карту', error);
    throw error;
  }
};

export const getUserLocation = async (): Promise<Coords> => {
  try {
    const position = await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    );

    const {latitude, longitude} = position.coords;
    return [latitude, longitude];
  } catch (error) {
    console.log('Не удалось определить местоположение', error);
    throw error;
  }
};
