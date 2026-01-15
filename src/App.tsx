import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import FlightsPage from "./pages/FlightsPage";
import StatsPage from "./pages/StatsPage";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <DataProvider>
          <Router>
            <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
              <Header />
              <main className="overflow-auto">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/flights"
                    element={
                      <ProtectedRoute>
                        <FlightsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/stats"
                    element={
                      <ProtectedRoute>
                        <StatsPage />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </DataProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
