import "./App.css";
import "./styles/Main.scss";
import Navbar from "./components/layout/Navbar";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./hooks/useAuth";

function App() {
  const PrivateRoutes = () => {
    const authState = useAuth();
    if (authState === "pending") return <p>Caricamento...</p>;
    if (authState === "unauthenticated")
      return <Navigate to="/login" replace />;

    return <Outlet />;
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user" element={<PrivateRoutes />}>
          <Route path="/user/dashboard/:id" element={<Dashboard />} />
          {/* Altre rotte future: /user/profile, /user/settings */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
