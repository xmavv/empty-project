import Note from "./Note";
import Button from "./Button";

import { Toaster, toast } from "sonner";

export default function NoteList({
  notes,
  onSelectedNote,
  selectedNote,
  onAddNote,
}) {
  function handleShowNoteList() {}
  // jak teraz zrobic zeby ta klase zmienic zeby pokazala sie notelista?
  // jak narazie chyba za ciezko dla mnie bo to klase trzeba zmienic jak sie zmienia state?

  // no i tutaj oczywiscie trzeba zrobic debounce zeby uzytkownik mogl pobrac powiedzmy tylko co 5sekund
  // i wyswietlic o tym toasta gdy bedzie chcial wczesniej

  function makeNoteFile(noteToDownload) {
    //text inside file
    const textToSave = noteToDownload.description;

    //creating new blob
    const blob = new Blob([textToSave], { type: "text/directory" });

    //creating link to download a file
    const a = document.createElement("a");
    a.download = `${noteToDownload.title}.txt`;
    a.href = window.URL.createObjectURL(blob);
    a.style.display = "none";

    //add link to document
    document.body.appendChild(a);

    a.click();

    window.URL.revokeObjectURL(a.href);
    document.body.removeChild(a);

    toast.success("note succesfully downloaded!");
  }

  return (
    <div className="notes">
      <ul className="noteList">
        {notes.map((note) => (
          <Note
            note={note}
            key={note.title}
            onSelectedNote={onSelectedNote}
            selectedNote={selectedNote}
          />
        ))}
      </ul>
      <div className="noteList__buttons">
        {selectedNote && (
          <Button
            position="relative"
            onClick={() => makeNoteFile(selectedNote)}
          >
            Download selected note
          </Button>
        )}
        <Button onClick={onAddNote} position="relative">
          Add note
        </Button>
      </div>
    </div>
  );
}
