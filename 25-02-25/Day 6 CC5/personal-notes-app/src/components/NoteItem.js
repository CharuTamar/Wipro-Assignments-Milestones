import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";

const NoteItem = ({ note }) => {
  const { editNote, deleteNote } = useContext(NotesContext);

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <button onClick={() => editNote(note.id, prompt("New Title:", note.title), prompt("New Content:", note.content))}>Edit</button>
      <button onClick={() => deleteNote(note.id)}>Delete</button>
    </div>
  );
};

export default NoteItem;
