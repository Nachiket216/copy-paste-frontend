import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [res, setRes] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const url = "http://localhost:5000/copy";
        const response = await axios.get(url);
        setText(response?.data?.text?.txt);
        console.log("Text" + text);
      } catch (e) {
        console.log("Error : " + e);
      }
    };
    getData();
  }, []);

  const handleText = (e) => {
    setText(e.target.value);
    console.log(e.target.value);
  };

  const updateText = async () => {
    try {
      const body = {
        text: text,
      };
      const url = "http://localhost:5000/paste";
      const response = await axios.post(url, body);
      console.log(response);
      setRes(response?.data?.message);
      setText(response?.text?.txt);
    } catch (error) {
      if (error.response) {
        // If the request was made and the server responded with an error status
        console.error(
          "Error Response:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        // If the request was made but no response was received
        console.error("No Response:", error.request);
      } else {
        // Any other error
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <>
      <div></div>
      <h1>COPY PASTE</h1>
      <div>{res}</div>
      <div className="card">
        <div>
          <textarea
            value={text}
            name=""
            id=""
            rows="30"
            cols="80"
            onChange={handleText}
          ></textarea>
        </div>
        <button onClick={(e) => updateText()}>Save</button>
        <p>
          Paste your text here and try to open this site on the target machine.
        </p>
      </div>
    </>
  );
}

export default App;
