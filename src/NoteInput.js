export default function NoteInput() {
  return (
    <div className="noteInput">
      <input
        placeholder="Type Your title here..."
        className="noteInput__title"
      ></input>
      <textarea
        contentEditable
        className="noteInput__body"
        placeholder="Type Your note here..."
      ></textarea>
      <span className="dot red absolute"></span>
    </div>
  );
}
