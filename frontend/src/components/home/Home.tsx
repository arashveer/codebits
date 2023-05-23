import { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import {
  loadLanguage,
  langNames,
  langs,
} from "@uiw/codemirror-extensions-langs";
import { javascript } from "@codemirror/lang-javascript";
import axios from "axios";
import { APIResponse } from "../../types";
import { useLocation } from "react-router-dom";
import DropDownMenu from "../home/DropDownMenu";
import "../../styles/app.css";
import "../../styles/editor.css";
import { LanguageSupport, StreamLanguage } from "@codemirror/language";
import FileName from "./fileName";

export enum EditorFont {
  SMALL = "0.9rem",
  MEDIUM = "1.1rem",
  LARGE = "1.25rem",
}

function Home() {
  const [codebox, setCodebox] = useState<string>("");
  const [apiResponse, setApiResponse] = useState<APIResponse>();
  const [editorFontSize, setEditorFontSize] = useState<EditorFont>(
    EditorFont.MEDIUM
  );
  const [editorLanguage, setEditorLanguage] = useState<LanguageSupport>(
    langs.javascript
  );
  const location = useLocation();

  function saveData() {
    axios({
      method: "POST",
      url: "http://localhost:3000/api/code/create",
      data: JSON.stringify({
        code: codebox,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setApiResponse(res.data);
      })
      .catch((err) => {
        console.log("Error sending data to api", err);
      });
  }

  function updateData() {
    axios({
      method: "PUT",
      url: `http://localhost:3000/api/code/${apiResponse?.id}`,
      data: JSON.stringify({
        code: codebox,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("Success!");
      })
      .catch((err) => {
        console.log("Error sending data to api", err);
      });
  }

  function changeFontSize(size: EditorFont) {
    setEditorFontSize(size);
  }

  function changeLanguage(lang: LanguageSupport) {
    setEditorLanguage(lang);
  }

  useEffect(() => {
    if (location.state) {
      setCodebox(location.state.code);
    }
  }, [location.state]);

  return (
    <>
      <div className="flex-container">
        <DropDownMenu
          fontSize={editorFontSize}
          setFontSize={changeFontSize}
          setEditorLanguage={changeLanguage}
        />
        <div className="file-tab">
          <FileName code_id={apiResponse?.id || ""} />
        </div>
        <div className="flex-link-share">
          <div className="top-tabs">
            <div className="flex-link">
              {apiResponse ? (
                <div className="flex-link-share">
                  <input
                    value={`http://localhost:5173/snippet/${apiResponse?.share}`}
                    className="flex-link"
                    id="copy-link"
                    disabled
                  />
                  <div className="copy-seperator" />
                  <button
                    className="copy-button"
                    onClick={(self) => {
                      navigator.clipboard.writeText(
                        "http://localhost:5173/snippet/" +
                          apiResponse?.share +
                          "/"
                      );
                      self.currentTarget.innerHTML = "COPIED!";
                      self.currentTarget.classList.add("active-copied-accent");
                    }}
                  >
                    COPY
                  </button>
                </div>
              ) : (
                "Click save to generate a link!"
              )}
            </div>
          </div>
        </div>
        <div>
          {apiResponse ? (
            <button className="save-button" onClick={updateData}>
              Update
            </button>
          ) : (
            <button className="save-button" onClick={saveData}>
              Save
            </button>
          )}
        </div>
      </div>
      <div
        style={{
          fontSize: editorFontSize,
        }}
      >
        <CodeMirror
          value={codebox}
          height="600px"
          theme="dark"
          extensions={
            [editorLanguage]
            // [javascript({ jsx: true })]
          }
          onChange={(value) => {
            setCodebox(value);
          }}
        />
      </div>
      <div className="flex-bottom">This will be info block!</div>
    </>
  );
}

export default Home;
