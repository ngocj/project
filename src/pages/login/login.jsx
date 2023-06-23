import { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { instanceGuest } from '../../component/baseURL/instance';

export const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (user.length === 0 || password.length === 0) {
        alert("Không được để trống");
      } else {
        const res = await instanceGuest.post(`/api/auth/login?password=${password}&username=${user}`, {
          username: user,
          password: password,
    
        });
        const token = res.data.token
        if (token) {
          localStorage.setItem('token', token);
          navigate('/');
        } else {
          alert("không có token");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="wrapper">
      <p className="fw-bold ms-1">Quản lí dự án</p>
      <img className="img1" src={require('./anh1.png')} alt="Image 1" />
      <img className="img2" src={require('./anh2.png')} alt="Image 2" />
      <form className="form1" onSubmit={handleLogin}>
        <h2 className="text-center text-primary mb-5 fw-bold">Đăng nhập</h2>
        <div className="mb-3">
          <label className="form-label">Tài khoản</label>
          <input
            type="text"
            className="form-control"
            placeholder="Tài khoản"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mật khẩu</label>
          <input
            type="password"
            className="form-control"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary form-control">
          Đăng nhập
        </button>
      </form>
    </div>
  );
};
