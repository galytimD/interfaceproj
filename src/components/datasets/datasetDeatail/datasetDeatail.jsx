// DatasetDetail.jsx
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DatasetService } from "../../../services/DatasetService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "./datasetDetail.css";
import DialogFileDetail from "../../dialog/dialogFileDetail";
import DialogPreprocessingParams from "../../dialog/dialogPreprocessingParams";

const DatasetDetail = () => {
  const { id } = useParams();
  const [dataFiles, setDataFiles] = useState([]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();


  const fetchData = useCallback(async () => {
    try {
      const response = await DatasetService.getById(id);
      setDataFiles(response.data);
    } catch (error) {
      console.error("Ошибка при получении данных датасета:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const onRowSelect = (e) => {
    setSelectedFile(e.data);
    setIsDialogVisible(true);
  };

  const deleteFile = () => {  
    DatasetService.deleteFile(id, selectedFile.id).then(() => {
      setIsDialogVisible(false);
      const updatedFiles = dataFiles.filter((element) => element.id !== selectedFile.id);
      setDataFiles(updatedFiles);
      if (updatedFiles.length === 0) {
        navigate('/datasets');
      }
    });
  };
  
  

  return (
    <div>
      <div className="p-flex p-justify-between p-align-center">
        <h1>Dataset Details</h1>
        <Button label="Обработка" onClick={() => setVisible(true)} />
      </div>

      <DataTable
        className="mt-4 table"
        value={dataFiles}
        onRowClick={onRowSelect}
        selectionMode="single"
        paginator rows={20}
      >
        <Column field="id" header="id" sortable></Column>
        <Column field="name" header="Название" sortable></Column>
        <Column field="coordinates" header="Координаты" sortable></Column>
        <Column field="resolution" header="Разрешение" sortable></Column>
        <Column field="orientation" header="Ориентация" sortable></Column>
      </DataTable>

      <DialogFileDetail
        isVisible={isDialogVisible}
        onHide={() => setIsDialogVisible(false)}
        selectedFile={selectedFile}
        deleteFile={deleteFile}
        dataset_id={id}
      />

      <DialogPreprocessingParams
        isVisible={isVisible}
        onHide={() => setVisible(false)}
        dataFile={dataFiles[0] || {}}
        dataset_id={id}
        />
    </div>
  );
};

export default DatasetDetail;