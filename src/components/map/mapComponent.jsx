import React, { useEffect, useState } from 'react';
import { YMaps, Map, Placemark, Polyline } from 'react-yandex-maps';
import environment from '../../environment/environment';
import { DatasetService } from '../../services/DatasetService';
import "./map.css";
import { ProgressSpinner } from 'primereact/progressspinner'; // Предположим, что вы используете библиотеку PrimeReact
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const MapComponent = () => {
  const [mapState, setMapState] = useState(null); // Состояние карты по умолчанию null
  const [vineyards, setVineyards] = useState([]); // Данные о виноградниках
  const [loading, setLoading] = useState(true); // Состояние загрузки данных и карты
  const [selectedCoord, setSelectedCoord] = useState(null); // Состояние для выбранного куста
  const [selectedGrape, setSelectedGrape] = useState(null); // Состояние для выделенного куста в таблице
  const apiKey = environment.yandexMapApiKey;

  useEffect(() => {
    // Начинаем загрузку данных и карты
    fetchData();

    // Устанавливаем задержку в 2.5 секунды для отображения индикатора загрузки
    const timer = setTimeout(() => {
      setLoading(false); // Устанавливаем состояние загрузки в false после задержки
    }, 2500);

    // Очистка таймера при размонтировании компонента
    return () => clearTimeout(timer);
  }, []);

  const fetchData = async () => {
    try {
      const response = await DatasetService.getCoordinates();
      console.log(response);

      const vineyardsData = response.data.map(vineyard => ({
        id: vineyard.id,
        grapes: vineyard.grapes.map((grape, index) => ({
          id: grape.id,
          row: vineyard.id,
          grapeNumber: index + 1,
          coordinates: grape.coordinates,
          health: grape.health
        }))
      }));

      if (vineyardsData.length > 0) {
        const allCoordinates = vineyardsData.flatMap(vineyard =>
          vineyard.grapes.map(grape => grape.coordinates)
        );

        const centerCoordinates = calculateCenter(allCoordinates);
        setMapState({ center: centerCoordinates, zoom: 16 });
      }

      setVineyards(vineyardsData);
    } catch (error) {
      console.error("Ошибка при получении данных датасета:", error);
    }
  };

  const calculateCenter = (coordinates) => {
    const totalLat = coordinates.reduce((sum, coord) => sum + coord[0], 0);
    const totalLon = coordinates.reduce((sum, coord) => sum + coord[1], 0);
    return [totalLat / coordinates.length, totalLon / coordinates.length];
  };

  const handleZoom = (grape) => {
    setMapState({ center: grape.coordinates, zoom: 18 }); // Устанавливаем центр и зум на выбранную метку
    setSelectedCoord(grape); // Устанавливаем выбранную метку
    setSelectedGrape(grape); // Устанавливаем выбранную строку в таблице
  };

  const flattenedVineyards = vineyards.flatMap(vineyard =>
    vineyard.grapes.filter(grape => !grape.health).map(grape => ({
      id: grape.id,
      row: grape.row,
      grapeNumber: grape.grapeNumber,
      coordinates: grape.coordinates
    }))
  );

  return (
    <YMaps query={{ apikey: apiKey }}>
      <div className="contener">
        {loading ? (
          <div className="spinner-container">
            <ProgressSpinner />
          </div>
        ) : (
          <>
            {mapState && (
              <Map
                state={mapState}
                style={{ width: "75%", height: "720px" }}
              >
                {vineyards.map((vineyard) => (
                  <Polyline
                    key={vineyard.id}
                    geometry={vineyard.grapes.map(grape => grape.coordinates)}
                    options={{
                      strokeColor: '#00FF00',
                      strokeWidth: 5,
                      strokeOpacity: 0.4 // Бледный цвет линии
                    }}
                  />
                ))}
                {flattenedVineyards.map(grape => (
                  <Placemark
                    key={grape.id}
                    geometry={grape.coordinates}
                    options={{
                      preset: selectedGrape && selectedGrape.id === grape.id ? 'islands#redDotIcon' : 'islands#blueDotIcon' // Устанавливаем цвет метки
                    }}
                  />
                ))}
              </Map>
            )}
          </>
        )}
        <div className="element">
          <DataTable
            value={flattenedVineyards}
            onRowClick={(e) => handleZoom(e.data)}
            paginator rows={10}
            selectionMode="single"
            selection={selectedGrape}
            onSelectionChange={(e) => setSelectedGrape(e.value)}
          >
            <Column field="row" header="Ряд"></Column>
            <Column field="grapeNumber" header="Куст в ряду"></Column>
          </DataTable>
        </div>
      </div>
    </YMaps>
  );
};

export default MapComponent;
