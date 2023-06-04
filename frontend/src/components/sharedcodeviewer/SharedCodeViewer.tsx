import * as React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { APIResponse } from "../../types";
import { timeSince } from "../../utils/timeSince";

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
    <div>
      Last modified:{" "}
      {apiResponse &&
        timeSince(Date.parse(apiResponse.updatedAt.toString()).toString())}
      <CodeMirror
        value={apiResponse?.code}
        height="500px"
        width="800px"
        theme="dark"
        extensions={[javascript({ jsx: true })]}
        editable={false}
      />
      <Link to={"/"} state={apiResponse}>
        Make a copy
      </Link>
    </div>
  );
}
