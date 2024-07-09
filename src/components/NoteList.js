import Note from "./Note";
import Button from "./Button";
import styles from './Notes.module.css'

import { Toaster, toast } from "sonner";

export default function NoteList({
  notes,
  onSelectedNote,
  selectedNote,
  onAddNote,
}) {
  return (
    <div className={styles.notes}>
      <ul className={styles.noteList}>
        {notes.map((note) => (
          <Note
            note={note}
            key={note.id}
            onSelectedNote={onSelectedNote}
            selectedNote={selectedNote}
          />
        ))}
      </ul>
      <div className={styles.noteListButtons}>
        <Button onClick={onAddNote} position="relative">
          Add note
        </Button>
      </div>
    </div>
  );
}
