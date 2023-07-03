import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "./pages/login/login";
import { Tochuc } from "./pages/tochuc/tochuc";
import { useEffect } from "react";
import { Home } from "./pages/Home/Home";
import { Quantri } from "./pages/quantritv/quantritv";
import { Nganhnghe } from "./pages/quantridm/nganhnghe";
import { Course } from "./pages/quantridm/khoa";
import { Class } from "./pages/quantridm/lop";
import { Manager } from "./pages/Doan/qldot";
import { Topic } from "./pages/Doan/topic";
import { ContextProvider} from "./component/useContext";

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
    <ContextProvider>
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/nganhnghe" element={<Nganhnghe />} />
            <Route path="/khoa" element={<Course />} />
            <Route path="/lop" element={<Class />} />
            <Route path="/quanlidot" element={<Manager />} />
            <Route path="/khodetai" element={<Topic />} />
            <Route path="/quantritv" element={<Quantri />} />
            <Route path="/tochuc" element={<Tochuc />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </ContextProvider>
  );
}

export default App;
