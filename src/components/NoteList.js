import Note from "./Note";
import Button from "./Button";
import styles from './Notes.module.css'

import { Toaster, toast } from "sonner";
import {useNote} from "../contexts/NoteContext";

export default function NoteList() {
    const {dispatch, notes, inputElement} = useNote();

  return (
    <div className={styles.notes}>
      <ul className={styles.noteList}>
        {notes.map((note) => (
          <Note
            note={note}
            key={note.id}
          />
        ))}
      </ul>
      <div className={styles.noteListButtons}>
        <Button
          onClick={() => {
            dispatch({ type: "note/new" });
            inputElement.current.focus();
          }}
          position="relative"
        >
          Add note
        </Button>
      </div>
    </div>
  );
}
