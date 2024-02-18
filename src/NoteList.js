import Note from "./Note";
import Button from "./Button";

export default function NoteList({
  notes,
  onSelectedNote,
  selectedNote,
  onAddNote,
}) {
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
