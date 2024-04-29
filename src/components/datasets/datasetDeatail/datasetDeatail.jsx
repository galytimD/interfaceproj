import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DatasetService } from '../../../services/DatasetService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import './datasetDetail.css';


const DatasetDetail = () => {
  const { id } = useParams();
  const [dataset, setDataset] = useState(null);
  const [dataFiles, setDataFiles] = useState([]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await DatasetService.getById(id);
      setDataset(response.data);  // предполагаем, что это детали датасета
      setDataFiles(response.data); // предполагаем, что файлы датасета возвращаются в том же ответе
    } catch (error) {
      console.error('Ошибка при получении данных датасета:', error);
    }
  };

  const onRowSelect = (e) => {
    setSelectedFile(e.data);
    setIsDialogVisible(true);
    console.log(selectedFile);
  };
  const deleteFile = () => {
    {
      DatasetService.deleteFile(id, selectedFile.id).then(() => {
        setIsDialogVisible(false);
        setDataFiles(dataFiles.filter(elemnt => elemnt.id !== selectedFile.id))
      });
    }
  }

  const renderDialog = () => (
    <Dialog
    style={
      {
        height: '100%',
        width: "50%"
      }} 
    header="Detail of File" visible={isDialogVisible} maximizable onHide={() => setIsDialogVisible(false)}>
      {selectedFile && (
        <div className="container flex">
          <Image src={`http://127.0.0.1/images/${selectedFile.path}`} alt="Dataset Image"
          height='700px'
          width='525px'

          style={{
            display: 'block', // Элемент блочного типа
            marginLeft: 'auto', // Выравнивание по центру
            marginRight: 'auto',
            objectFit: 'cover' // Выравнивание по центру
          }} />
      <div 
        className="dataset-detail__content w-full flex flex-column justify-content-between mx-3"
      >
        <div className="content__info">
          <p>Coordinates: {selectedFile.coordinates}</p>
          <p>Resolution: {selectedFile.resolution}</p>
          <p>Orientation: {selectedFile.orientation}</p>
        </div>
        <Button onClick={deleteFile} className='w-10 mb-3 mx-auto' label='Удалить' />
      </div>
    </div>
      )}
    </Dialog>
  );


  if (!dataset) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dataset Details</h1>
      <DataTable value={dataFiles} onRowClick={onRowSelect} selectionMode="single">
        <Column field="id" header="id" sortable></Column>
        <Column field="name" header="Name" sortable></Column>
        <Column field="path" header="Path" sortable></Column>
        <Column field="created_at" header="Creation time" sortable></Column>
        <Column field="coordinates" header="coordinates" sortable></Column>
        <Column field="resolution" header="resolution" sortable></Column>
        <Column field="orientation" header="orientation" sortable></Column>
      </DataTable>
      {renderDialog()}
    </div>
  );
}

export default DatasetDetail;
