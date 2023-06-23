import { instance } from '../../component/baseURL/instance';
import { useEffect, useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import { CiGrid41 } from 'react-icons/ci';
import { FcManager } from 'react-icons/fc';

export const Nganhnghe = () => {
  const [value, setValue] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [Id, setId] = useState(null);
  const [Code, setCode] = useState("");
  const [Name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [codeip, setCodeip] = useState("");
  const [job, setJob] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await instance({
        url: '/api/field',
        method: "GET"
      })
      setValue(response.data);
      setSearchResult(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await instance({
        url: `/api/field/${id}`,
        method: "DELETE"
      });
      const newList = value.filter(item => item.id !== id);
      setValue(newList);
      setSearchResult(newList);
    } catch (error) {
      console.error('Lỗi khi xoá ngành nghề:', error);
    }
  };

  const handleEdit = (id, code, name) => {
    setId(id);
    setCode(code);
    setName(name);
    handleShow();
  };

  const handleUpdate = async () => {
    try {
      await instance({
        url: `/api/field/${Id}`,
        method: "PUT",
        params: {
          code: Code,
          name: Name
        }
      })
      const updatedList = value.map(item => {
        if (item.id === Id) {
          return { ...item, code: Code, name: Name };
        }
        return item;
      });
      setValue(updatedList);
      setSearchResult(updatedList);
      handleClose();
    } catch (error) {
      console.error('Lỗi khi sửa ngành nghề:', error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await instance({
        url: '/api/field',
        method: "POST",
        params: {
          code: Code,
          name: Name
        }
      })
      const newItem = response.data;
      setValue(prevValue => [...prevValue, newItem]);
      setSearchResult(prevResult => [...prevResult, newItem]);
      setCode("");
      setName("");
      handleClose();
    } catch (error) {
      console.error('Lỗi khi thêm ngành nghề:', error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setId(null);
    setCode("");
    setName("");
  };

  const handleShow = () => setShowModal(true);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResult.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSubmit = (e) => {
    e.preventDefault();

    const filteredSearch = value.filter(
      (item) =>
        item.name.toLowerCase().includes(job.toLowerCase()) &&
        item.code.toLowerCase().includes(codeip.toLowerCase())
    );

    setSearchResult(filteredSearch);
    setCurrentPage(1);
  };

  return (
    <div>
      <div className='d-flex align-items-center justify-content-between'>
        <h4 className="fw-bold mt-3">Ngành nghề ({value.length})</h4>
        <Button variant="primary" onClick={handleShow}>
          + Thêm ngành nghề
        </Button>
      </div>
      <div>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{Id ? "Sửa" : "Thêm"} ngành nghề</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='row'>
              <div className='col'>
                <label className="form-label">Mã ngành nghề</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder='Nhập mã'
                  value={Code}
                  onChange={e => setCode(e.target.value)}
                />
              </div>
              <div className='col'>
                <label className="form-label">Ngành nghề</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder='Nhập ngành nghề'
                  value={Name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Huỷ
            </Button>
            <Button variant="primary" onClick={Id ? handleUpdate : handleAdd}>
              {Id ? "Lưu" : "Thêm"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã ngành nghề</th>
            <th>Ngành nghề</th>
            <th colSpan={2}>
              <i className='display-6 d-flex justify-content-center'><FcManager /></i>
            </th>
          </tr>
          <tr>
            <th><i className='display-6 d-flex justify-content-center'><CiGrid41 /></i></th>
            <th>
              <input
                type="text"
                className="form-control"
                placeholder="Mã ngành nghề"
                value={codeip}
                onChange={e => setCodeip(e.target.value)}
              />
            </th>
            <th>
              <input
                type="text"
                className="form-control"
                placeholder="Ngành nghề"
                value={job}
                onChange={e => setJob(e.target.value)}
              />
            </th>
            <th colSpan={2}>
              <button className="btn btn-success" onClick={handleSubmit}>Search</button>
            </th>
          </tr>
        </thead>

        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{indexOfFirstItem + index + 1}</td>
              <td>{item.code}</td>
              <td>{item.name}</td>
              <td>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleEdit(item.id, item.code, item.name)}
                >
                  Sửa
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <nav>
          <ul className="pagination">
            {Array.from({ length: Math.ceil(searchResult.length / itemsPerPage) }).map(
              (_, index) => (
                <li
                  key={index}
                  className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};
