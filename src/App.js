import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Preprocessed from './components/preprocessed/preprocessed';
import Datasets from './components/datasets/datasets';
import Statistics from './components/statistics/statistics';
import Navbar from './components/navbar/navbar';
import DatasetDetail from './components/datasets/datasetDeatail/datasetDeatail';
import './App.css';
import MapComponent from './components/map/mapComponent';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
        <Routes>
          <Route path="/" element={<Datasets />} />
          <Route path="/preprocessed" element={<Preprocessed />} />
          <Route path="/datasets/:id" element={<DatasetDetail/>} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/map" element={<MapComponent />} />
        </Routes>
    </BrowserRouter>
  );
}
export default App;