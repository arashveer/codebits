import React, { useEffect } from "react";
import "../../styles/app.css";
import axios from "axios";
import { BACKEND_URL } from "../../config";

interface Props {
  code_id: String;
  changeName: React.Dispatch<React.SetStateAction<string>>;
}

export default function FileName(props: Props) {
  const [filename, setFilename] = React.useState<string>("untitled");
  const [isEditable, setIsEditable] = React.useState<boolean>(false);
  const inputRef = React.useRef<any>(null);

  function updateTitle(newTitle: string) {
    axios({
      method: "PUT",
      url: `${BACKEND_URL}/api/code/${props.code_id}`,
      data: JSON.stringify({
        id: props.code_id,
        title: newTitle,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  useEffect(() => {
    props.changeName(filename);
  }, [filename]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditable]);

  return (
    <div
      className={
        "top-tabs flex font-mono " +
        (isEditable ? "expand-tab" : "contract-tab")
      }
    >
      <input
        id="file-name"
        type="text"
        ref={inputRef}
        value={filename}
        disabled={!isEditable}
        title={filename}
        onChange={(e) => {
          setFilename(e.target.value);
        }}
      />
      {isEditable ? (
        <button
          className="rename-button"
          onClick={() => {
            updateTitle(filename);
            setIsEditable(false);
          }}
        >
          <div className="tick-icon" />
        </button>
      ) : (
        <button
          className="rename-button"
          onClick={() => {
            setIsEditable(true);
          }}
        >
          <div className="rename-icon" />
        </button>
      )}
    </div>
  );
}
