import {useEffect} from "react";

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