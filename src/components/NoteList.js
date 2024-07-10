import Note from "./Note";
import Button from "./Button";
import styles from './Notes.module.css'

import { Toaster, toast } from "sonner";
import {useNote} from "../contexts/NoteContext";

export default function NoteList({
  notes,
  onSelectedNote,
  selectedNote,
  onAddNote,
}) {
    const {dispatch} = useNote();

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
        <Button onClick={() => dispatch({type: 'note/new'})} position="relative">
          Add note
        </Button>
      </div>
    </div>
  );
}
