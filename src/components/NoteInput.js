import {useEffect} from "react";
import Button from "./Button";
import Dot from "./Dot";
import PlaceholderContainer from "./PlaceholderContainer";
import { toast } from "sonner";
import styles from './Notes.module.css'
import {useNote} from "../contexts/NoteContext";

export default function NoteInput() {
  const {
      dispatch,
      selectedNote,
      showAddNote,
      titleFromInput,
      descriptionFromInput,
      color,
      inputElement
  } = useNote();

  useEffect(function() {
    inputElement.current.focus();
  }, [])

  function handleNewNoteSubmit(e) {
    e.preventDefault();
    dispatch({type: 'note/add-to-list'});
  }

  // DELETE key handle to delete note
  useEffect(
    function () {
      function keyDelete(e) {
        if (selectedNote !== null && e.code === "Delete")
          dispatch({type: 'note/delete', payload: selectedNote});
      }

      document.addEventListener("keyup", keyDelete);

      return () => document.removeEventListener("keyup", keyDelete);
    },
    [selectedNote, dispatch]
  );

  // CTRL + S key handle download note
  const pressedKeys = {};
  useEffect(
    function () {
      function keyPressed(e) {
        if (selectedNote === null) return;

        function keyDownload(e) {
          pressedKeys[e.code] = true;

          if (
            pressedKeys["ControlLeft"] === true &&
            pressedKeys["KeyS"] === true
          )
            checkDelay(() => dispatch({type: 'note/download', payload: selectedNote}), 5000);
        }
        keyDownload(e);
      }

      function keyReleased(e) {
        pressedKeys[e.code] = false;
      }

      document.addEventListener("keydown", keyPressed);
      document.addEventListener("keyup", keyReleased);

      return () => {
        document.removeEventListener("keydown", keyPressed);
        document.removeEventListener("keyup", keyReleased);
      };
    },
    [selectedNote, dispatch, pressedKeys]
  );

  let lastExecutionTime;
  function checkDelay(callback, delay) {
    const currTime = new Date().getTime();

    if (lastExecutionTime && currTime - lastExecutionTime < delay) {
      toast.warning("You can download one note per 5sec!", {
        style: { width: "32rem" },
      });

      lastExecutionTime = currTime;
      return;
    }

    callback();
    lastExecutionTime = currTime;
  }

  //nie pokazuje sie toast EDITED, bo tam w Componencie App sprawdzam czy aktualny title jest taki sam jak ten
  //z przekazanej notatki, a gdy na nowo wchodze do innej notatki to tak wlasnie jest
  useEffect(
    function () {
      if (selectedNote === null) return;

      const timeout = setTimeout(() => {
        dispatch({type: 'note/edit', payload: selectedNote})
      }, 5000);

      return () => clearTimeout(timeout);
    },
    [titleFromInput, descriptionFromInput, dispatch, selectedNote]
  );

  return (
    <div>
      <form className={styles.noteInput} onSubmit={(e) => e.preventDefault()}>
        <input
            ref={inputElement}
          value={titleFromInput}
          onChange={(e) => {
            dispatch({type: "note/title-edited", payload: e.target.value})
          }}
          placeholder={
            showAddNote
              ? "Type title of your note"
              : "Choose a note or start typing to add new note"
          }
          className={styles.noteInputTitle}
        ></input>
        <textarea
          value={descriptionFromInput}
          onChange={(e) => dispatch({type: "note/description-edited", payload: e.target.value})}
          contentEditable
          className={styles.noteInputBody}
          placeholder={showAddNote ? "Type description of your note" : ""}
        ></textarea>
        {(showAddNote || selectedNote) && (
          <Dot
            cssClass={`dot ${color} absolute`}
            color={color}
          />
        )}
        {showAddNote && (
          <Button
            position={"absolute"}
            direction={"right"}
            onClick={handleNewNoteSubmit}
          >
            ADD
          </Button>
        )}
        {selectedNote && (
          <>
            <Button
              position="absolute"
              direction="left"
              onClick={() => checkDelay(() => dispatch({type: 'note/download', payload: selectedNote}), 5000)}
            >
              DOWNLOAD
            </Button>
            <Button
              position="absolute"
              direction="right"
              onClick={() => dispatch({type: 'note/delete', payload: selectedNote})}
            >
              DELETE
            </Button>
          </>
        )}
      </form>
      <PlaceholderContainer />
    </div>
  );
}
