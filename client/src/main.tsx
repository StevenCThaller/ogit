import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { APIProvider } from "@vis.gl/react-google-maps";
import { google_maps_api_key } from "./constants.ts";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import ProvideAuth from "./providers/ProvideAuth.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <ProvideAuth>
      <APIProvider
        apiKey={google_maps_api_key}
        onLoad={() => console.log("Maps API has loaded")}
      >
        <App />
      </APIProvider>
    </ProvideAuth>
  </BrowserRouter>
  // </StrictMode>
);
