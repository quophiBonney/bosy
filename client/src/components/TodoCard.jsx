import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { FaTrash, FaEdit } from "react-icons/fa";
import { HiPrinter } from "react-icons/hi";

const TodosCard = () => {
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const handleClose = () => setShow(false);
  const handleCloseUpdateModal = () => setUpdateModal(false);
  const [data, setData] = useState({
    title: "",
    description: "",
  });
  const baseURL = "https://bosy-backend.vercel.app";

  useEffect(() => {
    handleFetchTodo();
  }, []);

  const handleFetchTodo = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/api/todos`);
      const todoData = response.data;
      setTodoList(todoData);
    } catch (error) {
      console.error("Error fetching todos:", error);
      toast.error("Error fetching todos!");
    } finally {
      setLoading(false);
    }
  };
  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      const insertTodo = await axios.post(`${baseURL}/api/todos`, data);
      toast.success(insertTodo.data.message);
      setShow(false);
      handleFetchTodo();
    } catch (error) {
      toast.error(error.response ? error.response.data : error.message);
    }
  };

  const handleUpdateTodo = async () => {
    try {
      if (!selectedTodo) {
        toast.error("No todo selected for update.");
        return;
      }
      const response = await axios.put(
        `${baseURL}/api/todos/${selectedTodo._id}`,
        data
      );
      toast.success(response.data.message);
      setUpdateModal(false);
      // Refresh todo list after update
      handleFetchTodo();
    } catch (error) {
      toast.error(error.response ? error.response.data : error.message);
    }
  };

  const handleDeleteTodo = async (_id) => {
    try {
      const deleteTodo = await axios.delete(`${baseURL}/api/todos/${_id}`);
      toast.success(deleteTodo.data.message);
      // Refresh todo list after delete
      handleFetchTodo();
    } catch (error) {
      toast.error(error.response ? error.response.data : error.message);
    }
  };

  const handleOpenUpdateModal = (todo) => {
    setSelectedTodo(todo);
    setData({
      title: todo.title,
      description: todo.description,
    });
    setUpdateModal(true);
  };

  const handlePrintTodo = async (_id) => {
    try {
      const todo = todoList.find((todo) => todo._id === _id);
      if (!todo) {
        toast.error("Todo not found.");
        return;
      }
      const formattedTodo = `
      Title: ${todo.title}
      Description: ${todo.description}
    `;
      console.log("Todo to be printed:", formattedTodo);
      window.print(formattedTodo);
    } catch (error) {
      console.error("Error sharing todo:", error);
    }
  };
  return (
    <>
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-light px-3 mb-2">
        <h4 className="h-4 text-uppercase">Todos List</h4>
        <p className="p">Below are the list of todos you've saved.</p>
        <button
          className="p-2 border-0 btn btn-light text-primary fw-bold"
          onClick={() => setShow(true)}
        >
          Add Todo
        </button>
      </div>
      <div className="row px-2">
        {todoList.map((done) => (
          <div
            className="col-xs-12 col-sm-6 col-md-6 col-lg-4 text-decoration-none main-container mb-3 d-flex"
            key={done._id}
          >
            <div className="card shadow text-center px-2 flex-fill h-100 home-card text-light d-flex flex-column justify-content-between ">
              <h4 className="h-4 mt-3 text-uppercase">{done.title}</h4>
              <p className="p">{done.description}</p>
              <div className="text-center mb-2">
                <button
                  className="btn bg-light text-danger me-2"
                  onClick={() => handleDeleteTodo(done._id)}
                >
                  <FaTrash size={20} />
                </button>
                <button
                  className="btn btn-light text-dark me-2"
                  onClick={() => handleOpenUpdateModal(done)}
                >
                  <FaEdit size={20} className="text-primary" />
                </button>
                <button
                  className="btn btn-light text-primary"
                  onClick={() => handlePrintTodo(done._id)}
                >
                  <HiPrinter size={20} className="text-dark" />
                </button>
              </div>
              <div className="bg-light-green text-center">
                <p className="px-3 p  p-2 text-light fw-bold">
                  {/* Assuming todo.time is defined */}
                  {done.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal className="lg" show={show} onHide={handleClose}>
        <Modal.Header>
          <h2 className="h-2 text-primary">Add Todo</h2>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAddTodo}>
            <div className="mt-3 form-group">
              <input
                type="text"
                name="title"
                placeholder="title"
                onChange={(e) => setData({ ...data, title: e.target.value })}
                className="form-control p-3"
              />
            </div>
            <div className="mt-3 form-group">
              <textarea
                className="form-control"
                name="description"
                placeholder="description"
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
                rows={8}
                cols={10}
                required
              />
            </div>
            <div className="mt-3 form-group">
              <input
                type="submit"
                value={loading ? "Adding Todo" : "Add Todo"}
                className="btn btn-primary text-light"
              />
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Modal className="lg" show={updateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header>
          <h2 className="h-2">Update Todo</h2>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleUpdateTodo}>
            <div className="mt-3 form-group">
              <input
                type="text"
                name="title"
                placeholder="title"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                className="form-control p-3"
              />
            </div>
            <div className="mt-3 form-group">
              <textarea
                className="form-control"
                name="description"
                value={data.description}
                placeholder="description"
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
                rows={8}
                cols={10}
                required
              />
            </div>
            <div className="mt-3 form-group">
              <input
                type="submit"
                value={loading ? "Updating Todo" : "Update Todo"}
                className="btn btn-primary text-light"
              />
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default TodosCard;
