import Dot from "./Dot";

export default function Note({ note, onSelectedNote, selectedNote }) {
  const isSelected = note.id === selectedNote?.id;

  return (
    <li
      className={isSelected ? "noteList__item selected" : "noteList__item"}
      onClick={() => onSelectedNote(note)}
    >
      <h3 className="heading-tertiary">
        <Dot cssClass={`dot ${note.color}`} />
        {note.title}
      </h3>
    </li>
  );
}
