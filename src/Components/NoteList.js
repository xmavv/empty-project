import Note from "./Note";
import Button from "./Button";

import { Toaster, toast } from "sonner";

export default function NoteList({
  notes,
  onSelectedNote,
  selectedNote,
  onAddNote,
}) {
  // no i tutaj oczywiscie trzeba zrobic debounce zeby uzytkownik mogl pobrac powiedzmy tylko co 5sekund
  // i wyswietlic o tym toasta gdy bedzie chcial wczesniej

  function makeNoteFile(noteToDownload) {
    //text inside file
    const textInside = noteToDownload.description;

    const blob = new Blob([textInside], { type: "text/directory" });

    //creating link to download a file
    const a = document.createElement("a");
    a.download = `${noteToDownload.title}.txt`;
    a.href = window.URL.createObjectURL(blob);
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(a.href);
    document.body.removeChild(a);

    toast.success("note succesfully downloaded!");
  }

  let lastExecutionTime;
  function checkDelay(callback, delay) {
    const currTime = new Date().getTime();

    if(lastExecutionTime && (currTime - lastExecutionTime < delay)) {
      toast.warning('You can download one note per 5sec!', {
        style: {width: '32rem'}
      });

      lastExecutionTime = currTime;
      return;
    }

    callback();
    lastExecutionTime = currTime;
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
            onClick={() => checkDelay(() => makeNoteFile(selectedNote), 5000)}
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
