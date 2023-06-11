import * as React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { APIResponse } from "../../types";
import { timeSince } from "../../utils/timeSince";
import "../../styles/app.css";
import "../../styles/editor.css";
import "../../styles/viewer.css";

export function SharedCodeViewer() {
  const [apiResponse, setApiResponse] = React.useState<APIResponse>();
  const { codeid } = useParams() || {};

  function retrieveData(data_id: string) {
    axios({
      method: "GET",
      url: `http://localhost:3000/api/share_id/${data_id}`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setApiResponse(res.data);
      })
      .catch((err) => {
        console.log("Error getting data from api", err);
      });
  }

  React.useEffect(() => {
    console.log("useEffect - Rendered!");
    if (codeid) {
      retrieveData(codeid);
    }
  }, []);

  return (
    <div className="container">
      <div className="file-name-header">{apiResponse?.title}</div>
      <div className="flex info-container">
        <div className="last-modified">
          {apiResponse?.language}
          {" | Created: "}
          {apiResponse &&
            new Date(apiResponse.createdAt.toString()).toLocaleDateString()}
          {" | Last modified: "}
          {apiResponse &&
            timeSince(Date.parse(apiResponse.updatedAt.toString()).toString())}
        </div>
        <div>
          <Link to={"/"} state={apiResponse}>
            <button className="save-button">Make a copy</button>
          </Link>
        </div>
      </div>
      <CodeMirror
        value={apiResponse?.code}
        height="600px"
        theme="dark"
        extensions={[javascript({ jsx: true })]}
        editable={false}
      />
    </div>
  );
}
