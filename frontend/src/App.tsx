import { Routes, Route } from "react-router-dom";

import PrivateRoute from "./utils/privateRoute";

import HomePage from "./pages/HomePage";

import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";

import TweeahPage from "./pages/TweeahPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/:id" element={<PrivateRoute><TweeahPage /></PrivateRoute>} />
      </Routes>


    </>
  )
}

export default App
