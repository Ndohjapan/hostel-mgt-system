import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import StudentsBody from "./pages/Students";
import { useSelector } from "react-redux";
import NotFound from "./pages/NotFound";

// eslint-disable-next-line react/prop-types
const AuthWrapper = ({ children }) => {
  const { twk } = useSelector((state) => state.auth);

  if (!twk) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default function App() {
  const { twk } = useSelector((state) => state.auth);

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        {twk && <Header />}
        <Routes>
          <Route path="/" element={<AuthWrapper><StudentsBody /></AuthWrapper>} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}
