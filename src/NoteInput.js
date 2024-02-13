import { useState } from "react";

export default function NoteInput({ selectedNote, showAddNote }) {
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");

  const title = showAddNote ? "" : selectedNote?.title;
  const description = showAddNote ? "" : selectedNote?.description;

  return (
    <div className="noteInput">
      <input
        value={title}
        // onChange={(e) => setTitle(e.target.value)}
        placeholder={
          showAddNote ? "Type title of your note" : "Add or choose a note"
        }
        className="noteInput__title"
      ></input>
      <textarea
        value={description}
        // onChange={(e) => setDescription(e.target.value)}
        contentEditable
        className="noteInput__body"
        placeholder={showAddNote ? "Type description of your note" : ""}
      ></textarea>
      {/* guard if selectedNote is null */}
      <span className={`dot ${selectedNote?.color} absolute`}></span>
    </div>
  );
}
