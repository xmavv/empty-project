import Button from "./Button";
import Dot from "./Dot";
import PlaceholderContainer from "./PlaceholderContainer";
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
                onClick={(e) => {
                    e.preventDefault();
                    dispatch({type: 'note/add-to-list'});
                  }
                }
              >
                ADD
              </Button>
            )}
            {selectedNote && (
              <>
                <Button
                  position="absolute"
                  direction="left"
                  onClick={() => dispatch({type: 'note/download', payload: selectedNote})}
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
