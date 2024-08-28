import { ToastContainer } from "react-toastify";
import "./App.css";
import { Header } from "./components";
import { Route, Routes } from "react-router-dom";
import { AuthPage } from "./views";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/:uid/dashboard" />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
