import {useEffect} from "react";

// const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
// matches conferts to true or false value
// mozna tu tez dac max-width: 600px; i sprawdzac fajne powiazanie z cssem

function useDark(isDark) {
    useEffect(
        function () {
            document.querySelector("body").style.backgroundColor = isDark
                ? "#111110"
                : "#f8f8f8";
        },
        [isDark]
    );
}

export {useDark};