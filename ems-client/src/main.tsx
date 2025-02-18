import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ListEmployee from "./components/ListEmployee.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ListEmployee />
  </StrictMode>
);
