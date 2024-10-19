import React, { useState, useEffect } from "react";
import TaskItem from "./components/TaskItem";
import EditDialog from "./components/EditDialog";
import AddBar from "./components/AddBar";
import { useSelector, useDispatch } from "react-redux";
import { setEditingTask, fetchTasks, updateTask } from "./redux/tasksSlice";
import axios from "axios";

const API_URL = "http://localhost:8080/api";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const [open, setOpen] = useState(false);
  const editingTask = useSelector((state) => state.tasks.editingTask);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleClickOpen = async (task) => {
    try {
      const response = await axios.get(`${API_URL}/tasks/${task.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(setEditingTask(response.data));
      setOpen(true);
    } catch (error) {
      console.error("Görev yüklenirken hata oluştu:", error);
    }
  };

  const handleClickClose = () => {
    setOpen(false);
    dispatch(setEditingTask(null));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    dispatch(setEditingTask({ ...editingTask, [name]: value }));
  };

  const handleUpdateTask = async () => {
    try {
      dispatch(updateTask(editingTask));
      handleClickClose();
    } catch (error) {
      console.error("Görev düzenlenirken hata oluştu:", error);
    }
  };

  return (
    <>
      <AddBar />
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            handleClickOpen={handleClickOpen}
          />
        ))}
      </ul>
      <EditDialog
        open={open}
        handleClickClose={handleClickClose}
        handleEditChange={handleEditChange}
        handleUpdateTask={handleUpdateTask}
        editingTask={editingTask}
      />
    </>
  );
};

export default TaskList;
