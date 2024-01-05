import React, { useState } from "react";
import "./styles.css";
import Button from "./components/Button.jsx";
import DragDrop from "./components/dropZone.jsx";
import Modal from "./components/Modal.jsx";

export default function App() {
  const [videos, setVideos] = useState(null);
  const [array, setArray] = useState([]);
  const [count, setCount] = useState(0);

  const resetArray = (id) => {
    if (id === undefined) setArray([]);
    else {
      const filteredArray = array.filter((arr) => arr.id !== id);
      console.log("filtered", filteredArray);
      setArray(filteredArray);
    }
  };

  const videoHandler = (metadata) => {
    const rawName = metadata.filename
      .split("\\")
      .filter((name) => name.includes("."));

    const rawNameWithoutExt = rawName[0].split(".")[0].trim();
    const nameWithOutWhiteSpace = rawNameWithoutExt.replace(/\s/g, "_");
    const rawExt = rawName[0].split(".")[1];

    const object = {
      id: array.length,
      filename: nameWithOutWhiteSpace,
      path: metadata.filename,
      duration: metadata.duration,
      extension: rawExt,
      preferred_ext: "mp4",
      progression: 0,
    };

    if (array.length !== 0) {
      const filteredArray = array.filter(
        (arr) => arr.filename === object.filename
      );
      filteredArray.length === 0 ? array.push(object) : null;
    } else {
      array.push(object);
    }
    setVideos(metadata);
  };

  const stockVideos = (newVideo) => {
    const path = newVideo.path;
    app.addVideo(path, videoHandler);
  };

  const convertProgress = (progress, id) => {
    setCount(Math.ceil(progress));
    array[id].progression = Math.ceil(progress);
    console.log(
      `comparaison ${id}`,
      array[id].progression,
      Math.ceil(progress)
    );
  };

  const convertVideoHandler = () => {
    array.forEach((arr) =>
      app.convertVideo(arr, arr.path, arr.preferred_ext, convertProgress)
    );
  };

  // open file
  const openFolderPath = (path, id) => {
    path = `C:\\Users\\fatih\\OneDrive\\Bureau\\Convert\\${array[id].filename}-converted.${array[id].preferred_ext}`;
  };

  const openFolderHandler = (id) => {
    app.openFolder(array[id], array[id].preferred_ext, openFolderPath);
  };

  const handleExtension = (ext, id) => {
    console.log("array", array);
    console.log("ext", ext);
    console.log("id", id);
    //bugfix
    // issue: si on selectionne au moins 2 videos et qu'on supprime le premier de la liste.
    // et qu'on selectionne une autre extension que mp4
    // un message d'erreur apparait avec preferre_ext undefined
    // why ? car un array = [0: {id: 0...}, 1: {id:1...}, 2: {id:2...}] si on supprime le premier objet cela donne
    // array [0: {id: 1,...}, 1: {id:2, ...}]
    // or le code était : array[id].preferred_ext = ext;
    // si l'id = 2 alors array[2].preferred_ext n'existe pas puisque array.length = 2
    // fixe: si l'id reste identique après suppression alors vaut mieux ce baser sur cette valeur sûr
    // donc on fait un map pour faire un loop (boucle) sur l'array et si l'item.id = id alors on change le preferred_ext
    // sinon on ne touche a rien
    array.map((item) => (item.id === id ? (item.preferred_ext = ext) : item));
  };

  const upDateComponent = (counter) => {
    if (counter >= 0) {
      return array.map((video) => {
        return (
          <Modal
            id={video.id}
            key={video.id}
            fileName={video.filename}
            duration={video.duration}
            progression={video.progression}
            openFolderHandler={openFolderHandler}
            resetArray={resetArray}
            handleExtension={handleExtension}
          />
        );
      });
    }
  };
  return (
    <>
      <div className="container">
        <div className="title">Convert Video</div>
        <DragDrop stockVideos={stockVideos}></DragDrop>
        {array.length !== 0 ? (
          <div className="container">
            {upDateComponent(count)}
            {count <= 100 ? (
              <Button
                convertVideoHandler={convertVideoHandler}
                resetArray={resetArray}
              ></Button>
            ) : null}
          </div>
        ) : (
          "No video added !"
        )}
      </div>
    </>
  );
}
