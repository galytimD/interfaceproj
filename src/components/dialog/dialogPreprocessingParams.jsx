import React, { useState } from "react";
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
}) => {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [checkedRot, setCheckedRot] = useState(false);
  const [checkedMirror, setCheckedMirror] = useState(false);
  const [checkedZoom, setCheckedZoom] = useState(false);
  const handleSubmit = async () => {
    try {
      const response = await DatasetService.preprocessing(dataset_id, width, height, checkedRot, checkedMirror,checkedZoom);
      console.log(response);
    } catch (error) {
      console.error("Error in preprocessing:", error);
    }
  };

  const inputParams = [
    { label: "Width", value: width, setValue: setWidth },
    { label: "Height", value: height, setValue: setHeight },
  ];

  const checkboxParams = [
    {
      label: "Поворот изображения",
      checked: checkedRot,
      setChecked: setCheckedRot,
    },
    {
      label: "Увеличение объекта",
      checked: checkedZoom,
      setChecked: setCheckedZoom,
    },
    {
      label: "Отражение изображения",
      checked: checkedMirror,
      setChecked: setCheckedMirror,
    },
  ];

  return (
    <Dialog
      header="Preprocessing Params"
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
          style={{ margin: "0 auto", objectFit: "cover" }}
        />
        <div className="dataset-detail__content w-full flex flex-column mx-3">
          <div className="content__inputs flex flex-column">
            {inputParams.map((input) => (
              <div key={input.label}>
                <p>{input.label}</p>
                <InputText
                  value={input.value}
                  onChange={(e) => input.setValue(e.target.value)}
                  type="number"
                />
              </div>
            ))}
            <p>Аугментация</p>
            {checkboxParams.map((checkbox) => (
              <div
                className="flex justify-content-between mt-3"
                key={checkbox.label}
              >
                <div>{checkbox.label}</div>
                <Checkbox
                  onChange={(e) => checkbox.setChecked(e.checked)}
                  checked={checkbox.checked}
                />
              </div>
            ))}
            <Button className="mt-3" label="Применить" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogPreprocessingParams;
