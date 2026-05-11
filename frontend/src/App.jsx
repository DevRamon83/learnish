import Navbar from "./components/layout/Navbar";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./hooks/useAuth";
import Footer from "./components/layout/Footer";
import VerifyUser from "./pages/VerifyUser";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import Mission from "./pages/Mission";
import Price from "./pages/Price";
import Privacy from "./pages/Privacy";
import Team from "./pages/Team";
import Tos from "./pages/Tos";
import Metadata from "./components/Metadata";
import useScrollToTop from "./hooks/useScrollToTop";

function App() {
  const authState = useAuth();
  useScrollToTop();
  const PrivateRoutes = () => {
    if (authState === "pending") return <p>Caricamento...</p>;
    if (authState === "unauthenticated")
      return <Navigate to="/login" replace />;

    return <Outlet />;
  };

  return (
    <>
      <Navbar />
      <Metadata />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify/:token" element={<VerifyUser />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/price" element={<Price />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/team" element={<Team />} />
        <Route path="/tos" element={<Tos />} />

        <Route path="/user" element={<PrivateRoutes />}>
          <Route path="/user/dashboard/:id" element={<Dashboard />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
