import { createContext, useState, useEffect } from "react";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState(() => {
        return JSON.parse(localStorage.getItem("notes")) || [];
    });

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    const addNote = (note) => {
        setNotes([...notes, note]);
    };

    const editNote = (id, updatedNote) => {
        setNotes(notes.map(note => (note.id === id ? updatedNote : note)));
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    return (
        <NotesContext.Provider value={{ notes, addNote, editNote, deleteNote }}>
            {children}
        </NotesContext.Provider>
    );
};
