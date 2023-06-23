import {  useState } from "react";
import { CiExport, CiImport } from "react-icons/ci";
import Swal from "sweetalert2";

export const Quantri = () => {
    const [user, setUser] = useState([]);
    const [input, setInput] = useState('');
    const handle = (e) => {
        e.preventDefault();
    };
    return (
        <div>
            <h3 className="fw-bold mt-3">Quản trị thành viên</h3>
            <div className="d-flex align-items-center justify-content-between my-3">
                <p>Thành viên: {user.length}</p>
                <div>
                    <button className="btn btn-primary me-2">+ Thêm thành viên</button>
                    <button className="btn btn-outline-primary me-2"><CiImport /></button>
                    <button className="btn btn-outline-primary"><CiExport /></button>
                </div>
            </div>
            <form onSubmit={handle}>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter something"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <button className="btn btn-success" type="submit">Search</button>
                </div>
            </form>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Họ và tên</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Email</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Giới tính</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((userData) =>
                        <tr key={userData.id}>
                            <th>{userData.id}</th>
                            <td>{userData.firstName}</td>
                            <td>{userData.phone}</td>
                            <td>{userData.email}</td>
                            <td>{userData.address?.address}</td>
                            <td>{userData.gender}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
