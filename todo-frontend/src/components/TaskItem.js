import React from "react";
import { IconButton, Switch } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../redux/tasksSlice";

const TaskItem = ({ task, handleClickOpen }) => {
  const dispatch = useDispatch();

  const handleTaskComplete = () => {
    const updatedTask = { ...task, completed: !task.completed };
    dispatch(updateTask(updatedTask));
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <label key={task.id}>
      <div>
        <Switch
          checked={task.completed}
          color="primary"
          onChange={handleTaskComplete}
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
        <span
          style={{ textDecoration: task.completed ? "line-through" : "none" }}
        >
          <strong>{task.title}</strong>: {task.description}
        </span>
        <IconButton onClick={() => handleClickOpen(task)}>
          <EditIcon color="primary" />
        </IconButton>
        <IconButton aria-label="delete" onClick={handleDelete}>
          <DeleteIcon color="primary" />
        </IconButton>
      </div>
    </label>
  );
};

export default TaskItem;
