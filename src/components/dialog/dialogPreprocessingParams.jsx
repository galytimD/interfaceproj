// DialogPreprocessingParams.jsx
import React from "react";
import { Dialog } from "primereact/dialog";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { DatasetService } from "../../services/DatasetService";

const DialogPreprocessingParams = ({
  dataset_id,
  isVisible,
  onHide,
  dataFile,
  width,
  setWidth,
  height,
  setHeight,
  checked,
  setChecked,
}) => {
  const handleSubmit = () => {
    console.error(checked);
    const response =  DatasetService.preproccessing_one(dataset_id, width, height, checked);
    console.log(response.data);
  };

  return (
    <Dialog
      header="Preproccessing params"
      visible={isVisible}
      maximizable
      onHide={onHide}
    >
      <div className="container flex">
        <Image
          src={`http://127.0.0.1/images/${dataFile.path}`}
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
          <div className="content__inputs flex flex-column">
            <p>Width</p>
            <InputText
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
            <p>Height</p>
            <InputText
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <p>Normalize</p>
            <Checkbox
              onChange={(e) => setChecked(e.checked)}
              checked={checked}
            ></Checkbox>
            <Button
              className="mt-3"
              label="Применить"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogPreprocessingParams;
