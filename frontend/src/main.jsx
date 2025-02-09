import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./output.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom"; 
import { AuthProvider } from "/src/context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </AuthProvider>
);
