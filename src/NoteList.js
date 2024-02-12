import Note from "./Note";

export default function NoteList({ notes }) {
  return (
    <ul className="noteList">
      {notes.map((note) => (
        <Note note={note} key={note.title} />
      ))}
    </ul>
  );
}
