import { Route, Routes } from "react-router";
import "./index.css";
import HomePage from "./pages/HomePage";
import ResultsPage from "./pages/ResultsPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route
        path="*"
        element={
          <ErrorPage
            errorHeading="Oooops, something went wrong"
            errorDescription="Page was not found"
            buttonText="Return to home page"
            buttonURL="/"
          />
        }
      />
    </Routes>
  );
}

export default App;
