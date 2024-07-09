import {createContext, useContext, useState} from "react";
import useLocalStorage from "use-local-storage";

const NoteContext = createContext();

function NoteProvider({children}) {
    const [selectedNote, setSelectedNote] = useState(null);
    const [showAddNote, setShowAddNote] = useState(true);
    const [notes, setNotes] = useLocalStorage("notes", []);
    const [titleFromInput, setTitleFromInput] = useState("");
    const [descriptionFromInput, setDescriptionFromInput] = useState("");
    const [color, setColor] = useState("undefined");
    const [isDark, setIsDark] = useLocalStorage("isDark", false);

    return <NoteContext.Provider value={{isDark,
        setIsDark,
        selectedNote,
        setSelectedNote,
        showAddNote,
        setShowAddNote,
        notes,
        setNotes,
        titleFromInput,
        setTitleFromInput,
        descriptionFromInput,
        setDescriptionFromInput,
        color,
        setColor}}>
        {children}
    </NoteContext.Provider>
}

function useNote() {
    const value = useContext(NoteContext);
    if(value === undefined) throw new Error('cannot use context outside its declaration');

    return value;
}

export { NoteProvider, useNote };