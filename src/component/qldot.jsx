import { useEffect } from "react";
import { useState } from "react"
import { instance } from "../../component/baseURL/instance";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";

export const Manager = () => {
    const [manager, setManager] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [searchResult, setSearchResult] = useState([])
    const [managerData, setManagerData] = useState({
        id: "",
        name: "",
        year: "",
        timeStart: "",
        timeEnd: "",
    })
    const [page, setPage] = useState(1);
    const [size] = useState(10)
    const [totalPage, setTotalPage] = useState(0);

    const lastItem = page * size;
    const firstItem = lastItem - size ;
    const currentItem = searchResult.slice(firstItem, lastItem)

    useEffect(() => {
        const calculatedTotalPage = Math.ceil(searchResult.length / size);
        setTotalPage(calculatedTotalPage);
    }, [searchResult, size]);




    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        instance({
            url: "/api/batch-project",
            method: "GET"
        })
            .then(res => {
                setManager(res.data)
                setSearchResult(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleCreate = () => {
        instance({
            url: "/api/batch-project",
            method: "POST",
            params: {
                name: managerData.name,
                year: managerData.year,
                time_start: managerData.timeStart,
                time_end: managerData.timeEnd,
            }
        })
            .then(res => {
                setManager(pre => [...pre, res.data]);
                setSearchResult(pre => [...pre, res.data]);
                resetData();
                handleClose();
            })
            .catch(error => console.log(error))
    }

    const resetData = () => {
        setManagerData({
            id: null,
            name: "",
            year: null,
            timeStart: null,
            timeEnd: null,
        })
    }

    const handleDelete = (itemId) => {
        instance({
            url: `/api/batch-project/${itemId}`,
            method: "DELETE"
        })
        const newList = manager.filter(item => item.id !== itemId)
        setManager(newList);
        setSearchResult(newList)
    }

    const handleEdit = (item) => {
        setManagerData({
            id: item.id,
            name: item.name,
            year: item.year,
            timeStart: item.timestart,
            timeEnd: item.timeEnd,
        })
        handleShow();
    }

    const handleUpdate = async (id) => {
        await instance({
            url: `/api/batch-project/${managerData.id}`,
            method: "PUT",
            params: {
                name: managerData.name,
                time_end: managerData.timeEnd,
                time_start: managerData.timeStart,
                year: managerData.year,
            },
        })
        const newList = manager.map((item) => {
            if (item.id === managerData.id) {
                item.name = managerData.name;
                item.timeStart = managerData.timeStart;
                item.timeEnd = managerData.timeEnd;
                item.year = managerData.year;
            }
            return item;
        });
        setManager(newList);
        setSearchResult(newList);
        handleClose();
    };
    const handleSearch = () => {

        const newList = manager.filter(item =>
            item.name.toLowerCase().includes(managerData.name.toLowerCase()) &&
            item.year.toString().toLowerCase().includes(managerData.year.toString().toLowerCase()) &&
            item.timeStart.toString().toLowerCase().includes(managerData.timeStart.toString().toLowerCase()) &&
            item.timeEnd.toString().toLowerCase().includes(managerData.timeEnd.toString().toLowerCase())
        )
        setSearchResult(newList);
        resetData()
    }

    const handleShow = () => {
        setShowModal(true);
    }
    const handleClose = () => {
        setShowModal(false);
    }

    const handlePageChange = (number) => {
        setPage(number)
    }
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center my-3">
            <h3 className="fw-bold mt-3">Đợt ({manager.length})</h3>
                <button className="btn btn-primary" onClick={handleShow}>+ Thêm đợt</button>
            </div>
            <Modal show={showModal} onHide={handleClose}>
                <ModalHeader closeButton>
                    <ModalTitle>
                        {managerData.id ? "Sửa đợt" : "Thêm đợt"}
                    </ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <label>Áp dụng đề tài của năm</label>
                    <input type="number" min="1900" max="2099" step="1" className="form-control"
                        value={managerData.year}
                        onChange={e => setManagerData({ ...managerData, year: e.target.value })}
                    />
                    <label className="mt-3">Tên đợt</label>
                    <input type="text" className="form-control" placeholder="Nhập tên đợt"
                        value={managerData.name}
                        onChange={e => setManagerData({ ...managerData, name: e.target.value })}
                    />
                    <div className="row">
                        <div className="col">
                            <label className="mt-3">Thời gian bắt đầu</label>
                            <input type="date" className="form-control" placeholder="Chọn thời gian"
                                value={managerData.timeStart}
                                onChange={e => setManagerData({ ...managerData, timeStart: e.target.value })}
                            />

                        </div>
                        <div className="col">
                            <label className="mt-3">Thời gian kết thức</label>
                            <input type="date" className="form-control" placeholder="Chọn thời gian"
                                value={managerData.timeEnd}
                                onChange={e => setManagerData({ ...managerData, timeEnd: e.target.value })}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-secondary" onClick={handleClose}>Huỷ</button>
                    <button className="btn btn-primary"
                        onClick={managerData.id ? handleUpdate : handleCreate}>{managerData.id ? "Sửa" : "Thêm"}</button>
                </ModalFooter>
            </Modal>
            <table className="table table-bordered text-center">
                <thead>
                    <tr className="table-active">
                        <th>STT</th>
                        <th>Áp dụng đề tài của năm</th>
                        <th>Tên đợt</th>
                        <th>Thời gian bắt đầu</th>
                        <th>Thời gian kết thúc</th>
                        <th>Thao tác</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>
                            <input type="number" min="1900" max="2099" step="1" className="form-control"
                                placeholder="Nhập năm"
                                value={managerData.year}
                                onChange={e => setManagerData({ ...managerData, year: e.target.value })}
                            />
                        </th>
                        <th> <input type="text" className="form-control" placeholder="Nhập tên đợt"
                            value={managerData.name}
                            onChange={e => setManagerData({ ...managerData, name: e.target.value })}
                        />
                        </th>
                        <th>
                            <input type="date" className="form-control" placeholder="Chọn thời gian"
                                value={managerData.timeStart}
                                onChange={e => setManagerData({ ...managerData, timeStart: e.target.value })}
                            />
                        </th>
                        <th>
                            <input type="date" className="form-control" placeholder="Chọn thời gian"
                                value={managerData.timeEnd}
                                onChange={e => setManagerData({ ...managerData, timeEnd: e.target.value })}
                            />
                        </th>
                        <th><button className="btn btn-success" onClick={handleSearch}>Search</button></th>
                    </tr>
                </thead>
                <tbody>
                    {currentItem.map((item, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.year}</td>
                            <td>{item.name}</td>
                            <td>{item.timeStart}</td>
                            <td>{item.timeEnd}</td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() =>
                                    handleEdit(item)}>Sửa</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Xoá</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                        <button className="page-link" aria-label="Previous"
                            onClick={() => handlePageChange(page - 1)} >
                            Previous
                        </button>
                    </li>
                    {Array.from({ length: totalPage }, (_, index) => (

                        <li className={`page-item ${page === index + 1 ? "active" : ""}`} key={index}>
                            <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}

                    <li className={`page-item ${page === totalPage ? "disabled" : ""}`}>
                        <button className="page-link" aria-label="Next" onClick={() => handlePageChange(page + 1)}>
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>

    )

}