// DialogFileDetail.jsx
import React from "react";
import { Dialog } from "primereact/dialog";
import { Image } from "primereact/image";
import { Button } from "primereact/button";

const DialogFileDetail = ({ isVisible, onHide, selectedFile, deleteFile }) => {
  return (
    <Dialog
      header="Detail of File"
      visible={isVisible}
      maximizable
      onHide={onHide}
    >
      {selectedFile && (
        <div className="container flex">
          <Image
            src={`http://127.0.0.1/images/${selectedFile.path}`}
            alt="Dataset Image"
            height="700px"
            width="525px"
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              objectFit: "cover",
            }}
          />
          <div className="dataset-detail__content w-full flex flex-column justify-content-between mx-3">
            <div className="content__info">
              <p>Координаты: {selectedFile.coordinates}</p>
              <p>Разрешение: {selectedFile.resolution}</p>
              <p>Orientation: {selectedFile.orientation}</p>
            </div>
            <Button
              onClick={deleteFile}
              className="w-10 mb-3 mx-auto"
              label="Удалить"
            />
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default DialogFileDetail;
