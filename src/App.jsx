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
import ManageBudget from "./pages/ManageBudgets";
import VendorList from "./pages/VendorList";
import WeddingForm from "./pages/WeddingForm";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Landing />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <LoginPage />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Navbar />
                <RegisterPage />
              </>
            }
          />
          <Route
            path="/weddings"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <WeddingProjects />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/weddings/:weddingId/dashboard"
            element={
              <ProtectedRoute>
                <WeddingDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/weddings/:weddingId/guests"
            element={
              <ProtectedRoute>
                <ManageGuests />
              </ProtectedRoute>
            }
          />
          <Route
            path="/weddings/:weddingId/checklist"
            element={
              <ProtectedRoute>
                <ManageChecklist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/weddings/:weddingId/budget"
            element={
              <ProtectedRoute>
                <ManageBudget />
              </ProtectedRoute>
            }
          />
          <Route
            path="/weddings/:weddingId/vendors"
            element={
              <ProtectedRoute>
                <VendorList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/weddings/:weddingId/website"
            element={
              <ProtectedRoute>
                <WeddingForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
