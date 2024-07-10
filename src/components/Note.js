import Dot from "./Dot";
import styles from './Notes.module.css'
import {useNote} from "../contexts/NoteContext";

export default function Note({ note, onSelectedNote, selectedNote }) {
  const isSelected = note.id === selectedNote?.id;
  const { dispatch } = useNote();

  return (
    <li
      className={isSelected ? styles.noteListItemSelected : styles.noteListItem}
      onClick={() => dispatch({ type: "note/selected", payload: note })}
    >
      <h3 className="heading-tertiary">
        <Dot cssClass={`dot ${note.color}`} />
        {note.title}
      </h3>
    </li>
  );
}
