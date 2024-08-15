import {useEffect} from "react";

function useEditNote(selectedNote, dispatch, titleFromInput, descriptionFromInput) {
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
        [dispatch, selectedNote, titleFromInput, descriptionFromInput]
    );
}

export {useEditNote}