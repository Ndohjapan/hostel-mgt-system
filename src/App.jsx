import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Students from "./pages/Students";
import { useSelector } from "react-redux";
import NotFound from "./pages/NotFound";
import StudentdDetail from "./pages/StudentdDetail";

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
          <Route path="/" element={<AuthWrapper><Students /></AuthWrapper>} />
          <Route path="/user/:userId" element={<AuthWrapper><StudentdDetail/></AuthWrapper>} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}
