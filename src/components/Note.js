import Dot from "./Dot";
import styles from './Notes.module.css'

export default function Note({ note, onSelectedNote, selectedNote }) {
  const isSelected = note.id === selectedNote?.id;

  return (
    <li
      className={isSelected ? styles.noteListItemSelected : styles.noteListItem}
      onClick={() => onSelectedNote(note)}
    >
      <h3 className="heading-tertiary">
        <Dot cssClass={`dot ${note.color}`} />
        {note.title}
      </h3>
    </li>
  );
}
