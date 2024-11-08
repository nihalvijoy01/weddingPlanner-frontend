import { useState } from "react";
import reactLogo from "./assets/react.svg";
import LoginPage from "./pages/LoginPage";
import viteLogo from "/vite.svg";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import WeddingDashboard from "./pages/WeddingDashboard";
import Landing from "./components/Landing/Landing";
import WeddingProjects from "./pages/WeddingPage";
import ManageGuests from "./pages/ManageGuests";
import ManageChecklist from "./pages/ManageChecklist";
import Navbar from "./components/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/weddings" element={<WeddingProjects />} />
          <Route
            path="/weddings/:weddingId/dashboard"
            element={<WeddingDashboard />}
          />
          <Route
            path="/weddings/:weddingId/guests"
            element={<ManageGuests />}
          />
          <Route
            path="/weddings/:weddingId/checklist"
            element={<ManageChecklist />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
