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

    let lastExecutionTime;
    function checkDelay(callback, delay) {
        const currTime = new Date().getTime();
        console.log(lastExecutionTime)
        console.log(currTime)

        if (!lastExecutionTime || currTime - lastExecutionTime < delay) {
            toast.warning("You can download one note per 5sec!", {
                style: { width: "32rem" },
            });

            lastExecutionTime = currTime;
            return;
        }

        callback();
        lastExecutionTime = currTime;
    }

    function debounce_leading(func, timeout = 300){
        let timer;
        return (...args) => {
            if (!timer) {
                func.apply(this, args);
            }
            clearTimeout(timer);
            timer = setTimeout(() => {
                timer = undefined;
            }, timeout);
        };
    }

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
              onClick={() => debounce_leading(() => dispatch({type: 'note/download', payload: selectedNote}), 5000)}
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
