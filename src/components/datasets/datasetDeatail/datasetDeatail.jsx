import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DatasetService } from '../../../services/DatasetService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Image } from 'primereact/image';


const DatasetDetail = () => {
  const { id } = useParams();
  const [dataset, setDataset] = useState(null);
  const [dataFiles, setDataFiles] = useState([]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DatasetService.getById(id);
        setDataset(response.data);  // предполагаем, что это детали датасета
        setDataFiles(response.data); // предполагаем, что файлы датасета возвращаются в том же ответе
      } catch (error) {
        console.error('Ошибка при получении данных датасета:', error);
      }
    };

    fetchData();
  }, [id]);

  const onRowSelect = (e) => {
    setSelectedFile(e.data);
    setIsDialogVisible(true);
  };

  const renderDialog = () => (
    <Dialog style={
      {
        height:'100%',
        width:"75%"
      }
    } header="Detail of File" visible={isDialogVisible}  maximizable onHide={() => setIsDialogVisible(false)}>
        {selectedFile && (
            
              <Image src={`http://127.0.0.1/images/downloads/${selectedFile.path}`} alt="Dataset Image"
              height='700px'
              width='525px'
              
                style={{
                  display: 'block', // Элемент блочного типа
                  marginLeft: 'auto', // Выравнивание по центру
                  marginRight: 'auto',
                  objectFit:'cover' // Выравнивание по центру
                }} />
            
        )}
    </Dialog>
);


  if (!dataset) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dataset Details</h1>
      <DataTable value={dataFiles} onRowClick={onRowSelect}>
        <Column field="name" header="Name" sortable></Column>
        <Column field="path" header="Path" sortable></Column>
        <Column field="created_at" header="Creation time" sortable></Column>
        
      </DataTable>
      {renderDialog()}
    </div>
  );
}

export default DatasetDetail;
