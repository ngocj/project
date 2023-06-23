import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "./pages/login/login";
import { Tochuc } from "./pages/tochuc/tochuc";
import { useEffect } from "react";
import { Home } from "./pages/Home/Home";
import { Quantri } from "./pages/quantritv/quantritv";
import { Nganhnghe } from "./pages/quantridm/nganhnghe";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, []);
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/nganhnghe" element={<Nganhnghe />} />
          <Route path="/quantritv" element={<Quantri />} />
          <Route path="/tochuc" element={<Tochuc />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
