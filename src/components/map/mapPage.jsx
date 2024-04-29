import React, { useEffect, useState } from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import environment from '../../environment/environment';

const MapComponent = () => {
  const [mapState, setMapState] = useState({ center: [55.751574, 37.573856], zoom: 9 });

  useEffect(() => {
    // Тут можно выполнить дополнительные операции после загрузки карты, если это необходимо
    console.log("Карта загружена");

    // Пример изменения состояния карты через 5 секунд после загрузки
    setTimeout(() => {
      setMapState({ center: [55.761574, 37.583856], zoom: 10 });
      console.log("Центр карты и масштаб изменены");
    }, 5000);
  }, []); // Пустой массив зависимостей означает, что эффект выполнится только после первого рендеринга

  return (
    <YMaps query={{ apikey: environment.apikey }}>
      <div>
        <h1>Мое Яндекс.Карты приложение</h1>
        <Map defaultState={mapState} style={{ width: "100%", height: "400px" }} />
      </div>
    </YMaps>
  );
};

export default MapComponent;
