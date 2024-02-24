import Note from "./Note";
import Button from "./Button";

export default function NoteList({
  notes,
  onSelectedNote,
  selectedNote,
  onAddNote,
}) {
  function handleShowNoteList() {}
  // jak teraz zrobic zeby ta klase zmienic zeby pokazala sie notelista?
  // jak narazie chyba za ciezko dla mnie bo to klase trzeba zmienic jak sie zmienia state?

  return (
    <div className="notes">
      <ul className="noteList">
        {notes.map((note) => (
          <Note
            note={note}
            key={note.title}
            onSelectedNote={onSelectedNote}
            selectedNote={selectedNote}
          />
        ))}
      </ul>
      <Button onClick={onAddNote} position="relative">
        Add note
      </Button>
    </div>
  );
}
