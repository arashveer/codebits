import { useEffect, useRef, useState } from "react";
import CodeMirror, { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import axios from "axios";
import { APIResponse } from "../../types";
import { useLocation } from "react-router-dom";
import DropDownMenu from "../home/DropDownMenu";
import "../../styles/app.css";
import "../../styles/editor.css";
import FileName from "./FileName";
import { languageSwitch } from "../../utils/languages";
import { BACKEND_URL, FRONTEND_URL } from "../../config";

export enum EditorFont {
  SMALL = "0.9rem" as any,
  MEDIUM = "1.1rem" as any,
  LARGE = "1.25rem" as any,
}

function Home() {
  const [codebox, setCodebox] = useState<string>("");
  const [filename, setFilename] = useState<string>("untitled");
  const [apiResponse, setApiResponse] = useState<APIResponse>();
  const [editorFontSize, setEditorFontSize] = useState<EditorFont>(
    EditorFont.MEDIUM
  );
  const [editorLanguage, setEditorLanguage] = useState<String>("javascript");
  const location = useLocation();
  const refs = useRef<ReactCodeMirrorRef>({});

  function saveData() {
    axios({
      method: "POST",
      url: `${BACKEND_URL}/api/code/create`,
      data: JSON.stringify({
        code: codebox,
        language: editorLanguage,
        title: filename,
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
      url: `${BACKEND_URL}/api/code/${apiResponse?.id}`,
      data: JSON.stringify({
        code: codebox,
        language: editorLanguage,
        title: filename,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  function changeFontSize(size: EditorFont) {
    setEditorFontSize(size);
  }

  function changeLanguage(lang: String) {
    setEditorLanguage(lang);
  }

  useEffect(() => {
    if (location.state) {
      setCodebox(location.state.code);
    }
  }, [location.state]);

  // useEffect(() => {
  //   if (refs.current?.view) console.log("EditorView:", refs.current?.view);
  //   if (refs.current?.state) console.log("EditorState:", refs.current?.state);
  //   // if (refs.current?.editor)
  //   console.log("HTMLDivElement:", refs.current?.editor);
  //   // refs.current?.view?.   viewState.state.doc.text.length;
  // }, [refs.current]);

  return (
    <div className="container">
      <div className="flex-container">
        <DropDownMenu
          fontSize={editorFontSize}
          setFontSize={changeFontSize}
          setEditorLanguage={changeLanguage}
        />
        <div className="file-tab">
          <FileName code_id={apiResponse?.id || ""} changeName={setFilename} />
        </div>
        <div className="flex-link-share">
          <div className="top-tabs">
            <div className="flex-link">
              {apiResponse ? (
                <div className="flex-link-share">
                  <input
                    value={`${FRONTEND_URL}/snippet/${apiResponse?.share}`}
                    className="flex-link"
                    id="copy-link"
                    disabled
                  />
                  <div className="copy-seperator" />
                  <button
                    className="copy-button"
                    onClick={(self) => {
                      navigator.clipboard.writeText(
                        FRONTEND_URL + "/snippet/" + apiResponse?.share + "/"
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
          ref={refs}
          value={codebox}
          height="650px"
          theme="dark"
          extensions={[languageSwitch(editorLanguage)()]}
          onChange={(value) => {
            setCodebox(value);
            // console.log(getStatistics(refs.current.view.).lineCount);
          }}
        />
      </div>
      <div className="flex-bottom">
        <div className="flex-bottom-item">{editorLanguage}</div>
        <div className="flex-bottom-item">
          font-size:{""}
          {Object.keys(EditorFont)[
            Object.values(EditorFont).indexOf(
              editorFontSize as unknown as EditorFont
            )
          ].toLowerCase()}
        </div>
      </div>
    </div>
  );
}

export default Home;
