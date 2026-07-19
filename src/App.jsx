import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import RegistrationForm from "./pages/RegistrationForm";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <Routes>

        {/* Redirect root to signup */}
        <Route
          path="/"
          element={<Navigate to="/signup" replace />}
        />

        {/* Authentication Routes */}
        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/registration"
          element={
            <ProtectedRoute>
              <RegistrationForm />
            </ProtectedRoute>
          }
        />

        {/* 404 Page */}

        <Route
          path="*"
          element={
            <h1
              style={{
                textAlign: "center",
                marginTop: "100px"
              }}
            >
              404 | Page Not Found
            </h1>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;