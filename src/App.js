import NoteList from "./NoteList";
import NoteInput from "./NoteInput";
import { useState } from "react";

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

export default function App() {
  const [selectedNote, setSelectedNote] = useState(null);
  const [showAddNote, setShowAddNote] = useState(false);
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [titleFromInput, setTitleFromInput] = useState("");
  const [descriptionFromInput, setDescriptionFromInput] = useState("");
  const [color, setColor] = useState("undefined");

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
    localStorage.setItem("notes", JSON.stringify([...notes, note]));

    setShowAddNote(false);
    setSelectedNote(note);
  }

  function handleUpdateNote(noteToUpdate) {
    setNotes((notes) =>
      notes.map((note) =>
        note.id === noteToUpdate.id
          ? {
              ...note,
              title: titleFromInput,
              description: descriptionFromInput,
              color: color,
            }
          : note
      )
    );
  }

  return (
    <div>
      <h1 className="heading-primary">📝 Your personal notebook</h1>
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
          color={color}
          setColor={setColor}
        />
      </div>
    </div>
  );
}
