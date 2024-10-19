import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@material-ui/core";

const EditDialog = ({
  open,
  handleClickClose,
  handleEditChange,
  handleUpdateTask,
  editingTask,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClickClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Update the task</DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          label="Title"
          name="title"
          onChange={handleEditChange}
          value={editingTask ? editingTask.title : ""}
        />
        <br />
        <br />
        <TextField
          variant="outlined"
          label="Description"
          name="description"
          onChange={handleEditChange}
          value={editingTask ? editingTask.description : ""}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdateTask} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
