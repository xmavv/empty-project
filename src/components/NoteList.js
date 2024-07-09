import Note from "./Note";
import Button from "./Button";

import { Toaster, toast } from "sonner";

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
            key={note.id}
            onSelectedNote={onSelectedNote}
            selectedNote={selectedNote}
          />
        ))}
      </ul>
      <div className="noteList__buttons">
        <Button onClick={onAddNote} position="relative">
          Add note
        </Button>
      </div>
    </div>
  );
}
