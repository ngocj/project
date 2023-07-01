import React, { useEffect, useState } from "react";
import { instance } from "../../component/baseURL/instance";
import { Modal } from "react-bootstrap";

export const Topic = () => {
  const [topics, setTopics] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchResult, setSearchResult] = useState([])
  const [topicData, setTopicData] = useState({
    content: "",
    description: "",
    isApply: false,
    name: "",
    timeStart: "",
  });

  const [size] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const lastItem = page * size;
  const firstItem = lastItem - size ;
  const currentItem = searchResult.slice(firstItem, lastItem )

  useEffect(() => {
    setTotalPage(Math.ceil(searchResult.length / size))

  }, [searchResult], [size], [currentItem])

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await instance.get("/api/topic");
      setTopics(res.data);
      setSearchResult(res.data)
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async () => {
    try {
      const res = await instance.post("/api/topic", topicData);
      setTopics(prevTopics => [...prevTopics, res.data]);
      setSearchResult(prevTopics => [...prevTopics, res.data]);
      resetTopicData();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    instance
      .delete(`/api/topic/${id}`)
      .then(() => {
        setTopics(prevTopics => prevTopics.filter(topic => topic.id !== id));
        setSearchResult(prevTopics => prevTopics.filter(topic => topic.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEdit = (topic) => {
    setTopicData({ ...topic });

    handleShow();
  };

  const handleUpdate = async () => {
    try {
      await instance.put(`/api/topic/${topicData.id}`, topicData);
      setTopics(prevTopics => prevTopics.map(topic => (topic.id === topicData.id ? topicData : topic)));
      setSearchResult(prevTopics => prevTopics.map(topic => (topic.id === topicData.id ? topicData : topic)));
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleShow = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const resetTopicData = () => {
    setTopicData({
      content: "",
      description: "",
      isApply: false,
      name: "",
      timeStart: "",
    });
  };

  const handleSearch = () => {
    const newList = topics.filter(item =>
      (item.name && item.name.toLowerCase().includes(topicData.name.toLowerCase())) &&
      (item.content && item.content.toLowerCase().includes(topicData.content.toLowerCase())) &&
      (item.description && item.description.toLowerCase().includes(topicData.description.toLowerCase())) &&
      (item.isApply && item.isApply.toString().toLowerCase().includes(topicData.isApply.toString().toLowerCase())) &&
      (item.timeStart && item.timeStart.toString().toLowerCase().includes(topicData.timeStart.toString().toLowerCase()))
    );
    setSearchResult(newList);
  };

  const handlePageChange = (number) => {
    setPage(number)
  }


  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-3">
      <h3 className="fw-bold mt-3">Đề tài({topics.length})</h3>
        <button className="btn btn-primary" onClick={handleShow}>
          + Thêm đề tài
        </button>
      </div>
      <div className="mb-3">
        <button className="btn btn-primary me-2">Kho</button>
        <button className="btn btn-primary me-2">Đề tài theo năm</button>
        <button className="btn btn-primary">Thống kê</button>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{topicData.id ? "Sửa đề tài" : "Thêm đề tài"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Tên đề tài</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nhập tên đề tài"
            value={topicData.name}
            onChange={(e) => setTopicData({ ...topicData, name: e.target.value })}
          />
          <label>Mô tả</label>
          <input
            type="text"
            className="form-control"
            value={topicData.description}
            onChange={(e) => setTopicData({ ...topicData, description: e.target.value })}
          />
          <label>Nội dung</label>
          <textarea
            className="form-control"
            value={topicData.content}
            onChange={(e) => setTopicData({ ...topicData, content: e.target.value })}
          />
          <label>Trạng thái</label>
          <select
            className="form-select"
            value={topicData.isApply}
            onChange={(e) => setTopicData({ ...topicData, isApply: e.target.value })}
          >
            <option value={false}>Chờ xét duyệt</option>
            <option value={true}>Áp dụng</option>
          </select>
          <label>Ngày tạo</label>
          <input
            type="date"
            className="form-control"
            value={topicData.timeStart}
            onChange={(e) => setTopicData({ ...topicData, timeStart: e.target.value })}
          />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Huỷ
          </button>
          <button className="btn btn-primary" onClick={topicData.id ? handleUpdate : handleCreate}>
            {topicData.id ? "Sửa" : "Thêm"}
          </button>
        </Modal.Footer>
      </Modal>
      <table className="table table-bordered text-center">
        <thead>
          <tr className="table-active">
            <th>STT</th>
            <th>Tên đề tài</th>
            <th>Nội dung</th>
            <th>Mô tả</th>
            <th>Trạng thái</th>
            <th>Ngày tạo</th>
            <th>Thao tác</th>
          </tr>
          <tr>
            <th></th>
            <th>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập tên đề tài"
                value={topicData.name}
                onChange={(e) => setTopicData({ ...topicData, name: e.target.value })}
              />
            </th>
            <th>
              <input
                type="text"
                className="form-control"
                value={topicData.description}
                onChange={(e) => setTopicData({ ...topicData, description: e.target.value })}
              />
            </th>
            <th>
              <textarea
                className="form-control"
                value={topicData.content}
                onChange={(e) => setTopicData({ ...topicData, content: e.target.value })}
              />
            </th>
            <th>
              <select
                className="form-select"
                value={topicData.isApply}
                onChange={(e) => setTopicData({ ...topicData, isApply: e.target.value })}
              >
                <option value={false}>Chờ xét duyệt</option>
                <option value={true}>Áp dụng</option>
              </select>
            </th>
            <th>
              <input
                type="date"
                className="form-control"
                value={topicData.timeStart}
                onChange={(e) => setTopicData({ ...topicData, timeStart: e.target.value })}
              />
            </th>
            <th colSpan={2}>
              <button className="btn btn-success" onClick={handleSearch}>Search</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItem.map((topic, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{topic.name}</td>
              <td>{topic.content}</td>
              <td>{topic.description}</td>
              <td>{topic.isApply ? "Áp dụng" : "Chờ xét duyệt"}</td>
              <td>{topic.timeStart}</td>
              <td>
                <button className="btn btn-warning" onClick={() => handleEdit(topic)}>
                  Sửa
                </button>
                <button className="btn btn-danger mt-3" onClick={() => handleDelete(topic.id)}>
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class={`page-item ${page === 1 ? "disable" : ""}`}>
            <button class="page-link" aria-label="Previous" onClick={() => handlePageChange(page - 1)}>
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
            <button class="page-link" aria-label="Next" onClick={() => handlePageChange(page + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>

    </div>
  );
};
