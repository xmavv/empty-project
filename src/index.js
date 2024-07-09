import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Main from "./Main";
import {NoteProvider} from "./contexts/NoteContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
      <React.StrictMode>
          <NoteProvider>
            <Main />
          </NoteProvider>
      </React.StrictMode>
);
