import React from "react";
import { FileUploader } from "react-drag-drop-files";
import "../styles.css";
const fileTypes = ["AVI", "MP4", "MPEG", "OGV", "MOV"];

function DragDrop(props) {
  const handleChange = (file) => {
    const arr = [...file];
    arr.forEach((item) => props.stockVideos(item));
  };

  return (
    <>
      <FileUploader
        classes="test"
        handleChange={handleChange}
        multiple={true}
        name="file"
        types={fileTypes}
      />
    </>
  );
}

export default DragDrop;
