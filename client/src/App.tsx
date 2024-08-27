import { ToastContainer } from "react-bootstrap";
import "./App.css";
import { Header } from "./components";
import { Route, Routes } from "react-router-dom";
import { AuthPage } from "./views";

function App() {
  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/:uid/dashboard" />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </>
  );
}

export default App;
