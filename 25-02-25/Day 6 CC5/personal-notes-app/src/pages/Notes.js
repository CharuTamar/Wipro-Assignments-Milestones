import AddNote from "../components/AddNote";
import NoteList from "../components/NoteList";

const Notes = () => {
  return (
    <div>
      <h2>My Notes</h2>
      <AddNote />
      <NoteList />
    </div>
  );
};

export default Notes;
