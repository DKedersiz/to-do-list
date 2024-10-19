import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/tasksSlice";

const AddBar = () => {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleAddTask = async () => {
    if (!newTask.title.trim() || !newTask.description.trim()) {
      alert("Lütfen bir görev yazınız!");
      return;
    }

    try {
      await dispatch(addTask(newTask)).unwrap();
      setNewTask({ title: "", description: "", completed: false });
    } catch (error) {
      console.log("Görev eklerken hata yakalandı:", error);
    }
  };

  return (
    <form noValidate autoComplete="off">
      <TextField
        id="title"
        label="Task Title"
        variant="outlined"
        name="title"
        value={newTask.title}
        onChange={handleChange}
      />
      <br />
      <br />
      <TextField
        id="description"
        label="Task Description"
        variant="outlined"
        value={newTask.description}
        name="description"
        onChange={handleChange}
      />
      <br />
      <br />
      <Button variant="contained" color="primary" onClick={handleAddTask}>
        Add Task
      </Button>
    </form>
  );
};

export default AddBar;
