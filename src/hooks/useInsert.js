import {useEffect} from "react";

function useInsert(inputElement, dispatch) {
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
}

export {useInsert}