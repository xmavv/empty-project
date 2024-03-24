import NoteList from "./NoteList";
import NoteInput from "./NoteInput";
import Toggle from "./Toggle";

import { Toaster, toast } from "sonner";

import { useState } from "react";
import useLocalStorage from "use-local-storage";

const notesArr = [
  {
    id: 1,
    title: "ja jestem mega szefem i robie se treninng nie",
    description: "cosik se tu napisalem xd1",
    color: "red",
  },
  {
    id: 2,
    title: "w sumie fajnie se tak poprogramowac hahfa",
    description: "cosik se tu napisalem xd2",
    color: "blue",
  },
  {
    id: 3,
    title: "porobie to na studia i zdam ten przedmiuot",
    description: "cosik se tu napisalem xd3",
    color: "green",
  },
  {
    id: 4,
    title:
      "robie sobie strima ziomek potem lcize se zielone odpalam go lada momeny, robie ziome ta mamone",
    description: "cosik se tu napisalem xd4",
    color: "green",
  },
  {
    id: 5,
    title: "hahahahahaha olaf nobas",
    description: "cosik se tu napisalem xd5",
    color: "green",
  },
];

const themeColor = {
  dark: "#0b0b09",
  light: "#f6f6f6",
  primary: "#178ed3",
};

export default function App() {
  const [selectedNote, setSelectedNote] = useState(null);
  const [showAddNote, setShowAddNote] = useState(false);
  const [notes, setNotes] = useLocalStorage("notes", []);
  const [titleFromInput, setTitleFromInput] = useState("");
  const [descriptionFromInput, setDescriptionFromInput] = useState("");
  const [color, setColor] = useState("undefined");

  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  // matches conferts to true or false value
  // mozna tu tez dac max-width: 600px; i sprawdzac fajne powiazanie z cssem

  const [isDark, setIsDark] = useLocalStorage("isDark", false);
  // so take from localstorage, but if there isnt any put false
  // ITS SO EZ WITH THIS USELOCALSTORAGE

  // pierwszy raz bierze z systemu, ale ostatecznie bierze to co sobie ustawil na tronie jak pomysli ze to drugie jest jednak lepsze

  document.querySelector("body").style.backgroundColor = isDark
    ? "#111110"
    : "#f8f8f8";

  function handleSelectedNote(note) {
    setSelectedNote(note);
    setShowAddNote(false);
    setTitleFromInput(note.title);
    setDescriptionFromInput(note.description);
    setColor(note.color);
  }

  function handleAddNoteButton() {
    setShowAddNote(true);
    setSelectedNote(null);
    setTitleFromInput("");
    setDescriptionFromInput("");
    setColor("undefined");
  }

  function handleAddNoteToList(note) {
    setNotes((notes) => [...notes, note]);

    setShowAddNote(false);
    setSelectedNote(note);
    toast.success("note succesfully added!");
  }

  //really not good to have the same operation 2 times

  function handleUpdateNote(noteToUpdate) {
    if (
      noteToUpdate.title === titleFromInput &&
      noteToUpdate.description === descriptionFromInput &&
      noteToUpdate.color === color
    ) {
      return;
    }

    setNotes((notes) =>
      notes.map((note) => {
        if (note.id === noteToUpdate.id) {
          const newNote = {
            ...note,
            title: titleFromInput,
            description: descriptionFromInput,
            color: color,
          };

          setSelectedNote(newNote);

          return newNote;
        } else {
          return note;
        }
      })
    );

    toast.info("note succesfully edited!");
  }

  function handleDeleteNote(noteToDelete) {
    setNotes((notes) => notes.filter((note) => note.id !== noteToDelete.id));

    setSelectedNote(null);
    setTitleFromInput("");
    setDescriptionFromInput("");
    toast.info("note succesfully deleted!");
  }

  function handleThemeChange() {
    setIsDark((s) => !s);

    // unfortunately i have to do it like this cause when i started i put some style on body and now its getting a little bit awkward when i delete them
    // really not good React is all about inmutablity and dom traversing and I do this omg
    document.querySelector("body").style.backgroundColor = isDark
      ? "#f8f8f8"
      : "#111110";
  }

  return (
    <div className="app" data-theme={isDark ? "dark" : "light"}>
      <div className="container">
        <NoteList
          notes={notes}
          onSelectedNote={handleSelectedNote}
          onAddNote={handleAddNoteButton}
          selectedNote={selectedNote}
        />
        <NoteInput
          selectedNote={selectedNote}
          showAddNote={showAddNote}
          titleFromInput={titleFromInput}
          descriptionFromInput={descriptionFromInput}
          setTitleFromInput={setTitleFromInput}
          setDescriptionFromInput={setDescriptionFromInput}
          handleAddNoteToList={handleAddNoteToList}
          handleUpdateNote={handleUpdateNote}
          handleDeleteNote={handleDeleteNote}
          setShowAddNote={setShowAddNote}
          color={color}
          setColor={setColor}
        />
      </div>
      <Toaster
        expand={true}
        duration={3000}
        position={window.innerWidth > 600 ? "bottom-right" : "top-center"}
        toastOptions={{
          style: {
            backgroundColor: isDark ? themeColor.dark : themeColor.light,
            color: themeColor.primary,
            border: `1px solid ${themeColor.primary}`,
            width: "27rem",
            right: "2rem",
            bottom: "2rem",
          },
        }}
      />
      <Toggle isChecked={isDark} onChange={handleThemeChange} />
    </div>
  );
}
