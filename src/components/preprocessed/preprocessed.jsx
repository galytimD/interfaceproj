import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DatasetService } from "../../services/DatasetService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import "./preprocessed.css";
import DialogFileDetail from "../dialog/dialogFileDetail";
import { InputText } from "primereact/inputtext";
const Preprocessed = () => {
  const [dataFiles, setDataFiles] = useState([]);
  const { id } = useParams(); // Получение параметра id из URL
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const response = await DatasetService.getPreprocessed();
      setDataFiles(response.data);
    } catch (error) {
      console.error("Ошибка при получении данных датасета:", error);
    }
  }, []);

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
  const handleUpload = () => {
    DatasetService.upload(name)
      .then(response => {
        console.log("Загрузка успешно завершена:", response);
        setVisible(false); // Закрываем диалог после успешной загрузки
      })
      .catch(error => {
        console.error("Ошибка при загрузке:", error);
      });
  };

  const inputParams = [
    { label: "Название проекта", value: name, setValue: setName },
   
  ];
  return (
    <div>
      <div className="p-flex p-justify-between p-align-center">
        <h1>Dataset Details</h1>
        <Button label="Отправить в диск" onClick={() => setVisible(true)}  />
      </div>

      <DataTable
        className="mt-4 table"
        value={dataFiles}
        paginator
        rows={20}
        onRowClick={onRowSelect}
      >
        <Column field="id" header="ID" sortable></Column>
        <Column field="name" header="Название" sortable></Column>
        <Column field="resolution" header="Разрешение" sortable></Column>
      </DataTable>
      <DialogFileDetail
        isVisible={isDialogVisible}
        onHide={() => setIsDialogVisible(false)}
        selectedFile={selectedFile}
        deleteFile={deleteFile}
        dataset_id={id}
      />
      <Dialog header="Загрузка данных в гугл диск" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                {inputParams.map((input) => (
              <div key={input.label}>
                <p>{input.label}</p>
                <InputText
                  value={input.value}
                  onChange={(e) => input.setValue(e.target.value)}
                />
              </div>
            ))}
            <Button label="Отправить" onClick={handleUpload} className="mt-3" />
            </Dialog>
    </div>
  );
};

export default Preprocessed;
