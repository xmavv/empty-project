import {createContext, useContext, useEffect, useReducer, useRef, useState} from "react";
import useLocalStorage from "use-local-storage";
import {toast} from "sonner";

const NoteContext = createContext();

const initialState = {
    notes:
            localStorage.getItem("notes") === null ?
            [] :
            JSON.parse(localStorage.getItem("notes")),
    selectedNote: null,
    showAddNote: true,
    titleFromInput: "",
    descriptionFromInput: "",
    color: "undefined",
    isDark: localStorage.getItem("isDark") === null ?
        false :
        JSON.parse(localStorage.getItem("isDark")),
}

function reducer(state, action) {
    switch(action.type) {
        case 'note/title-edited':
            return {
                ...state,
                titleFromInput: action.payload
            }
        case 'note/description-edited':
            return {
                ...state,
                descriptionFromInput: action.payload
            }
        case 'dot/color-switch':
            if (!action.payload) return {...state};

            switch (action.payload) {
                case "undefined":
                    return {...state, color: "red"}
                case "red":
                    return {...state, color: "green"}
                case "green":
                    return {...state, color: "blue"}
                case "blue":
                    return {...state, color: "red"}
                default:
                    return {...state, color: "undefined"}
            }
        case 'note/selected':
            return {
                ...state,
                selectedNote: action.payload,
                showAddNote: false,
                titleFromInput: action.payload.title,
                descriptionFromInput: action.payload.description,
                color: action.payload.color,
            }
        case 'note/new':
            return {
                ...state,
                showAddNote: true,
                selectedNote: null,
                titleFromInput: "",
                descriptionFromInput: "",
                color: "undefined"
            }
        case 'note/add-to-list':
            if (!state.titleFromInput)
                return {...state};

            const newNote = {
                id: crypto.randomUUID(),
                title: state.titleFromInput,
                description: state.descriptionFromInput,
                color: state.color,
            };

            const newNotes = [ ...state.notes, newNote ];

            toast.success("note succesfully added!");

            localStorage.setItem("notes", JSON.stringify(newNotes))

            return {
                ...state,
                notes: newNotes,
                showAddNote: false,
                selectedNote: newNote
            }
        case 'note/edit' :
            if (
                action.payload.title === state.titleFromInput &&
                action.payload.description === state.descriptionFromInput &&
                action.payload.color === state.color
            ) {
                return {...state};
            }

            const editedNotes = state.notes.map((note) => {
                if (note.id === action.payload.id) {
                    const newNote = {
                        ...note,
                        title: state.titleFromInput,
                        description: state.descriptionFromInput,
                        color: state.color,
                    };

                    // setSelectedNote(newNote);

                    return newNote;
                } else {
                    return note;
                }
            })

            toast.info("note succesfully edited!");

            localStorage.setItem("notes", JSON.stringify(editedNotes))

            return { ...state, notes: editedNotes }
        case 'note/delete':
            const deletedNotes =
                state.notes.filter((note) => note.id !== action.payload.id);

            toast.info("note succesfully deleted!");

            localStorage.setItem("notes", JSON.stringify(deletedNotes))

            return {
                ...state,
                notes: deletedNotes,
                selectedNote: null,
                titleFromInput: "",
                descriptionFromInput: "",
                showAddNote: true
            }
        case 'theme/switch':
            document.querySelector("body").style.backgroundColor = state.isDark
                ? "#f8f8f8"
                : "#111110";

            return {...state, isDark: !state.isDark}
        default: throw new Error('unknown action');
    }
}

function NoteProvider({children}) {
  // const [notes, setNotes] = useLocalStorage("notes", []);
  // const [isDark, setIsDark] = useLocalStorage("isDark", false);

  const [
    {
      notes,
      selectedNote,
      showAddNote,
      titleFromInput,
      descriptionFromInput,
      color,
      isDark,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const inputElement = useRef(null);

  // INSERT key handle to add note
  useEffect(function () {
    function keyAdd(e) {
      if (e.code === "Insert") {
        dispatch({ type: "note/new" });
        inputElement.current.focus();
      }
    }

    document.addEventListener("keyup", keyAdd);

    return () => document.removeEventListener("keyup", keyAdd);
  }, []);

  // CTRL + M key handle to change theme
  const pressedKeys = {};
  useEffect(
    function () {
      function keyPressed(e) {
        function keyTheme(e) {
          pressedKeys[e.code] = true;

          if (
            pressedKeys["ControlLeft"] === true &&
            pressedKeys["KeyM"] === true
          )
            // handleThemeChange();
            dispatch({ type: "theme/switch" });
        }
        keyTheme(e);
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
    [dispatch, pressedKeys],
  );

  return (
    <NoteContext.Provider
      value={{
        isDark,
        // setIsDark,
        selectedNote,
        // setSelectedNote,
        showAddNote,
        // setShowAddNote,
        notes,
        // setNotes,
        titleFromInput,
        // setTitleFromInput,
        descriptionFromInput,
        // setDescriptionFromInput,
        color,
        // setColor,

        inputElement,

        dispatch,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}

function useNote() {
    const value = useContext(NoteContext);
    if(value === undefined) throw new Error('cannot use context outside its declaration');

    return value;
}

export { NoteProvider, useNote };