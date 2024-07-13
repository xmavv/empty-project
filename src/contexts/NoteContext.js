import {createContext, useContext, useEffect, useReducer, useRef, useState} from "react";
import useLocalStorage from "use-local-storage";
import {toast} from "sonner";
import {useDelete} from "../hooks/useDelete";
import {useInsert} from "../hooks/useInsert";
import {useCtrl} from "../hooks/useCtrl";
import {useEditNote} from "../hooks/useEditNote";

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
    prev: 0,
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

            let editedNote;

            const editedNotes = state.notes.map((note) => {
                if (note.id === action.payload.id) {
                    editedNote = {
                        ...note,
                        title: state.titleFromInput,
                        description: state.descriptionFromInput,
                        color: state.color,
                    };

                    return editedNote;
                } else {
                    return note;
                }
            })

            toast.info("note succesfully edited!");

            localStorage.setItem("notes", JSON.stringify(editedNotes))

            return { ...state, notes: editedNotes, selectedNote: editedNote }
        case 'note/delete':
            const toDelete = window.confirm("Are You sure to delete this note?");
            if(!toDelete) return {...state};

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
        case 'note/download':
            //downloading note with 5sec gap for each action
            const now = new Date().getTime();

            if (now - state.prev < 5000) {
                toast.warning("You can download one note per 5sec!", {
                    style: { width: "32rem" },
                });
                return {...state}
            }

            //text inside file
            const textInside = action.payload.description;

            const blob = new Blob([textInside], { type: "text/directory" });

            //creating link to download a file
            const a = document.createElement("a");
            a.download = `${action.payload.title}.txt`;
            a.href = window.URL.createObjectURL(blob);
            a.style.display = "none";

            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(a.href);
            document.body.removeChild(a);

            toast.success("note succesfully downloaded!");

            return {...state, prev: now}
        case 'theme/switch':
            document.querySelector("body").style.backgroundColor = state.isDark
                ? "#f8f8f8"
                : "#111110";

            return {...state, isDark: !state.isDark}
        default: throw new Error('unknown action');
    }
}

function NoteProvider({children}) {
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

  //handling focus on the start of the app
  useEffect(function() {
    inputElement.current.focus();
  }, [])

  //handling diff keyboard actions
  useInsert(inputElement, dispatch);
  useDelete(selectedNote, dispatch);

  useCtrl(() => dispatch({ type: "theme/switch" }), "KeyM")
  useCtrl(() => {
      if (selectedNote === null) return;
      //tutaj powinno byc jeszcze checkDelay
    dispatch({ type: "note/download" , payload: selectedNote});
  }, "KeyS");

    useEditNote(selectedNote, dispatch, titleFromInput, descriptionFromInput);

  return (
    <NoteContext.Provider
      value={{
        isDark,
        selectedNote,
        showAddNote,
        notes,
        titleFromInput,
        descriptionFromInput,
        color,

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