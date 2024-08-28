import { ToastContainer } from "react-toastify";
import "./App.css";
import { Header } from "./components";
import { Route, Routes } from "react-router-dom";
import { AuthPage } from "./views";
import { useAuth } from "./hooks/useAuth";
import Dashboard from "./views/Dashboard";

function App() {
  const {
    auth: { isAuthenticated },
  } = useAuth();

  console.log(isAuthenticated);

  return (
    <>
      <Header />
      {isAuthenticated ? (
        <Routes>
          <Route path="/:uid/dashboard" element={<Dashboard />} />
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
