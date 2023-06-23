import { FaBell, FaCircleNotch, FaUserCircle } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
export const Header = () => {
    const navigate = useNavigate();
    const LogOut = () => {
        const token = localStorage.getItem('token')
        if (token) {
            navigate('/login');
        }
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Trường Đại học A</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <NavLink className="nav-link">
                        <i><FaCircleNotch /></i>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link">
                        <i><FaBell /></i>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <div className="nav-link pe-auto" onClick={LogOut}>
                        <i><FaUserCircle /></i>
                    </div>
                </li>
            </ul>
        </nav>
    );
}

