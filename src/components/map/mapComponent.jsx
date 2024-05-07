import React, { useEffect, useState } from 'react';
import { YMaps, Map, Placemark, Polygon } from 'react-yandex-maps';
import environment from '../../environment/environment';
import { DatasetService } from '../../services/DatasetService';
import "./map.css"
const MapComponent = () => {
  const [mapState, setMapState] = useState({});
  const [coordinates, setCoordinates] = useState([]);
  const apiKey = environment.yandexMapApiKey;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await DatasetService.getCoordinates();
      const coords = response.data.map(item => ({
        id: item.id,
        coordinates: item.coordinates
      }));
      if (coords.length > 0) {
        setMapState({center: coords[0].coordinates, zoom: 14.3 });
      }
      setCoordinates(coords);
    } catch (error) {
      console.error("Ошибка при получении данных датасета:", error);
    }
  };

  return (
    <YMaps apiKey={apiKey}>
      <div>
        <div className="contener">
          <Map defaultState={mapState} style={{ width: "75%", height: "720px"}}>
          {coordinates.map((coord, index) => (
            <Placemark key={index} geometry={coord.coordinates} />
          ))}
          <Polygon
            geometry={[coordinates.map(coord => coord.coordinates)]}
            options={{
              fillColor: '#00FF00',
              strokeColor: '#0000FF',
              strokeWidth: 5,
              strokeOpacity: 0.5,
              opacity: 0.3
            }}
          />
        </Map>
          <div className="element" >
          {coordinates.map((coord, index) => (
            <p>{coord.coordinates}</p>
          ))}
          </div>
        </div>
        
      </div>
    </YMaps>
  );
};

export default MapComponent;
