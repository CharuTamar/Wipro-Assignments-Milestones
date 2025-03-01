import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import { ThemeContext } from "../context/ThemeContext";
import { Card, CardContent, Typography, IconButton, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";

const NoteList = () => {
  const { notes, deleteNote } = useContext(NotesContext);
  const { themeMode } = useContext(ThemeContext); // Get dark/light mode
  const theme = useTheme(); // Access MUI theme

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      {notes.map((note) => (
        <Grid item xs={12} sm={6} md={4} key={note.id}>
          <Card
            sx={{
              backgroundColor: themeMode === "dark" ? theme.palette.grey[900] : "#f9f9f9",
              color: themeMode === "dark" ? "#ffffff" : "#000000",
            }}
          >
            <CardContent>
              <Typography variant="body1">{note.text}</Typography>
              <IconButton onClick={() => deleteNote(note.id)} color="error">
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default NoteList;
