export default function Note({ note, onSelectedNote, selectedNote }) {
  const isSelected = note.id === selectedNote?.id;

  return (
    <li
      className={isSelected ? "noteList__item selected" : "noteList__item"}
      onClick={() => onSelectedNote(note)}
    >
      <h3>
        <span className={`dot ${note.color}`}></span>
        {note.title}
      </h3>
    </li>
  );
}
