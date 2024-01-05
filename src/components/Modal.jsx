import React from "react";
import "../styles.css";
import { XCircle } from "lucide-react";
function Modal(props) {
  const duration = (time) => {
    const timeInMilliseconds = time * 1000;
    const date = new Date(timeInMilliseconds);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    return formattedTime;
  };
  // console.log("progression", props.id, props.progression);
  return (
    <>
      <div className="structure">
        <div className="videoZone">
          <div className="wrapper">
            <div>
              <button
                className="btn mr-5"
                onClick={() => {
                  props.resetArray(props.id);
                }}
              >
                <XCircle color="white" />
              </button>
            </div>
            <div>
              <span>
                <p className="file-title">{props.fileName}</p>
                <p className="file-duration">{duration(props.duration)}</p>
              </span>
            </div>
          </div>
          {props.progression <= 99 ? (
            <select
              onChange={(e) => props.handleExtension(e.target.value, props.id)}
              className="select"
              name="format"
            >
              <option value="MP4" defaultValue={true}>
                MP4
              </option>
              <option value="AVI">AVI</option>
              <option value="MPEG">MPEG</option>
              <option value="OGV">OGV</option>
              <option value="MOV">MOV</option>
            </select>
          ) : (
            <button
              className="button3"
              onClick={() => {
                props.openFolderHandler(props.id);
                console.log("pressed");
              }}
            >
              Open File
            </button>
          )}
        </div>
        {props.progression > 0 ? (
          <progress
            className="progress"
            value={props.progression}
            max="100"
            id="progress"
          ></progress>
        ) : null}
      </div>
    </>
  );
}
export default Modal;
