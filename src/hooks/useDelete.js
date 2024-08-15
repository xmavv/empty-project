import {useEffect} from "react";

function useDelete(selectedNote, dispatch) {
    // DELETE key handle to delete note
    useEffect(
        function () {
            if(selectedNote === null) return;

            function keyDelete(e) {
                if (e.code === "Delete")
                    dispatch({type: 'note/delete', payload: selectedNote});
            }

            document.addEventListener("keyup", keyDelete);

            return () => document.removeEventListener("keyup", keyDelete);
        },
        [selectedNote, dispatch]
    );
}

export {useDelete}