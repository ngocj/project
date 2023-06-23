
import { FaHome } from 'react-icons/fa';
import { BiChevronRight } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
export const Sidebar = () => {
    const [showsub, setshowsub] = useState(false);
    const [showsub1, setshowsub1] = useState(false);
    const handle = () => {
        setshowsub(!showsub);
    }
    const handle1 = () => {
        setshowsub1(!showsub1);
    }
    return (
        <div>
            <i className='display-4'><FaHome /></i>
            <div className="sidebar">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink className="nav-link active text-dark fw-bold" to={'/quantritv'}>Quản trị thành viên</NavLink>
                    </li>
                    <li className="nav-item d-flex align-items-center justify-content-between"
                        onClick={handle}
                    >
                        <NavLink className="nav-link text-dark fw-bold">Danh mục</NavLink>
                        <i><BiChevronRight /></i>
                    </li>
                    {showsub && (
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link text-dark" to={'/nganhnghe'}>Ngành nghề</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-dark">Khoá</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-dark">Lớp</NavLink>
                            </li>
                        </>
                    )
                    }
                    <li className="nav-item d-flex align-items-center justify-content-between"
                        onClick={handle1}
                    >
                        <NavLink className="nav-link text-dark  fw-bold">Đồ án</NavLink>
                        <i><BiChevronRight /></i>
                    </li>
                    {showsub1 && (
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link text-dark">Quản lí đợt</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-dark">Kho đề tài</NavLink>
                            </li>
                        </>
                    )}
                    <li className="nav-item">
                        <NavLink className="nav-link text-dark  fw-bold" to={'/tochuc'}>Tổ chức</NavLink>
                    </li>

                </ul>
            </div>
        </div>
    );
}