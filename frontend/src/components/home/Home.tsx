import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import app from "./styles/app.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function Home() {
  const [codebox, setCodebox] = useState<string>("");
  const { codeid } = useParams();

  function handleClick() {
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
        console.log("Success!");
      })
      .catch((err) => {
        console.log("Error sending data to api", err);
      });
  }

  function retrieveData(data_id: string) {
    axios({
      method: "GET",
      url: `http://localhost:3000/api/${data_id}`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setCodebox(res.data);
        console.log("Success!");
      })
      .catch((err) => {
        console.log("Error getting data from api", err);
      });
  }

  if (codeid) {
    retrieveData(codeid);
  }

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
      <button onClick={handleClick}>Save</button>
    </>
  );
}

export default Home;
