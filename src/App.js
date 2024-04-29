import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home/home';
import Datasets from './components/datasets/datasets';
import Statistics from './components/statistics/statistics';
import MapPage from './components/map/mapPage';
import Navbar from './components/navbar/navbar';
import DatasetDetail from './components/datasets/datasetDeatail/datasetDeatail';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/datasets" element={<Datasets />} />
          <Route path="/datasets/:id" element={<DatasetDetail/>} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
    </BrowserRouter>
  );
}
export default App;