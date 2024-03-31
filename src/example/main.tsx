import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GitbeakerProvider } from "@/provider";

const gitbeakerOptions = {
  token: import.meta.env.VITE_GITLAB_TOKEN ?? "",
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GitbeakerProvider options={gitbeakerOptions}>
      <App />
    </GitbeakerProvider>
  </React.StrictMode>,
);
