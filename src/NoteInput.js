import { useState } from "react";
import Button from "./Button";

export default function NoteInput({
  selectedNote,
  showAddNote,
  titleFromInput,
  descriptionFromInput,
  setTitleFromInput,
  setDescriptionFromInput,
  handleAddNoteToList,
  color,
  setColor,
}) {
  function handleSubmit(e) {
    e.preventDefault();

    if (!titleFromInput) return;

    const newNote = {
      id: crypto.randomUUID(),
      title: titleFromInput,
      description: descriptionFromInput,
      color: color,
    };

    handleAddNoteToList(newNote);
  }

  function changeColor(color) {
    switch (color) {
      case "undefined":
        setColor("red");
        break;
      case "red":
        setColor("green");
        break;
      case "green":
        setColor("blue");
        break;
      case "blue":
        setColor("red");
        break;
      default:
        setColor("undefined");
        break;
    }
  }

  return (
    <form className="noteInput">
      <input
        value={titleFromInput}
        onChange={(e) => setTitleFromInput(e.target.value)}
        placeholder={
          showAddNote ? "Type title of your note" : "Add or choose a note"
        }
        className="noteInput__title"
      ></input>
      <textarea
        value={descriptionFromInput}
        onChange={(e) => setDescriptionFromInput(e.target.value)}
        contentEditable
        className="noteInput__body"
        placeholder={showAddNote ? "Type description of your note" : ""}
      ></textarea>
      {(showAddNote || selectedNote) && (
        <span
          className={`dot ${
            selectedNote ? selectedNote?.color : color
          } absolute`}
          onClick={() => changeColor(color)}
        ></span>
      )}
      {showAddNote && (
        <Button absolute={"absolute"} onClick={handleSubmit}>
          OK
        </Button>
      )}
    </form>
  );
}
