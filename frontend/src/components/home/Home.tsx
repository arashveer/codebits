import { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import axios from "axios";
import { APIResponse } from "../../types";
import { useLocation } from "react-router-dom";

function Home() {
  const [codebox, setCodebox] = useState<string>("");
  const [apiResponse, setApiResponse] = useState<APIResponse>();
  const location = useLocation();

  function saveData() {
    axios({
      method: "POST",
      url: "http://localhost:3000/api/create",
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
      url: `http://localhost:3000/api/${apiResponse?.id}`,
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

  useEffect(() => {
    if (location.state) {
      setCodebox(location.state.code);
    }
  }, [location.state]);

  return (
    <>
      <CodeMirror
        value={codebox}
        height="500px"
        width="800px"
        theme="dark"
        extensions={[javascript({ jsx: true })]}
        onChange={(value) => {
          setCodebox(value);
        }}
      />
      {apiResponse ? (
        <button onClick={updateData}>Update</button>
      ) : (
        <button onClick={saveData}>Save</button>
      )}
      <hr />
      Link: http://localhost:5173/snippet/{apiResponse?.id}
      <hr />
    </>
  );
}

export default Home;
