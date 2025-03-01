import { useState, useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import { TextField, Button, Box } from "@mui/material";

const AddNote = () => {
  const [text, setText] = useState("");
  const { addNote } = useContext(NotesContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addNote({ id: Date.now(), text });
    setText("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 2, p: 2 }}>
      <TextField
        fullWidth
        label="Add a note..."
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button variant="contained" color="primary" type="submit">
        ➕ Add
      </Button>
    </Box>
  );
};
export default AddNote;
