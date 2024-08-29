import { ToastContainer } from "react-toastify";
import "./App.css";
import { Header } from "./components";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthPage, PinCreationPage } from "./views";
import { useAuth } from "./hooks/useAuth";
import Dashboard from "./views/Dashboard";

function App() {
  const {
    auth: { isAuthenticated, user },
  } = useAuth();

  return (
    <>
      <Header />
      {isAuthenticated ? (
        <Routes>
          <Route path="*" element={<Navigate to={`/${user._id}/explore`} />} />
          <Route path="/:uid/create" element={<PinCreationPage />} />
          <Route path="/:uid/explore" element={<Dashboard />} />
        </Routes>
      ) : (
        <Routes>
          {/* TODO: create an actual loading spinny page thing */}
          <Route path="/:uid/dashboard" element={<main>please wait</main>} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      )}
      <ToastContainer />
    </>
  );
}

export default App;
