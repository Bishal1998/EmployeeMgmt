import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ListEmployee from "./components/ListEmployee.tsx";
import { BrowserRouter, Routes, Route } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListEmployee />} />
        <Route path="/employees" element={<ListEmployee />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
