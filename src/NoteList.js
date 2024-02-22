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
      <div className="your-notes" onClick={handleShowNoteList}>
        <button className="btn btn--burger"></button>
        <span>Your notes</span>
      </div>
    </div>
  );
}
