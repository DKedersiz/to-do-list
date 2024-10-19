import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get(`${API_URL}/tasks`);
  return response.data;
});

export const addTask = createAsyncThunk("tasks/addTask", async (newTask) => {
  const response = await axios.post(`${API_URL}/tasks`, newTask, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
});

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId) => {
    await axios.delete(`${API_URL}/tasks/${taskId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return taskId;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (updatedTask) => {
    const response = await axios.put(
      `${API_URL}/tasks/${updatedTask.id}`,
      updatedTask,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    editingTask: null,
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setEditingTask: (state, action) => {
      state.editingTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    });
  },
});

export const { setTasks, setEditingTask } = tasksSlice.actions;
export default tasksSlice.reducer;
