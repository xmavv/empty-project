export default function Note({ note }) {
  return (
    <li className="noteList__item">
      <h3>
        <span className={`dot ${note.color}`}></span>
        {note.title}
      </h3>
    </li>
  );
}
