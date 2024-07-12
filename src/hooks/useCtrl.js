import {useEffect} from "react";

function useCtrl(callback, key) {
    // CTRL + 'KEY' handle
    const pressedKeys = {};
    useEffect(
        function () {
            function keyPressed(e) {
                function keyTheme(e) {
                    pressedKeys[e.code] = true;

                    if (
                        pressedKeys["ControlLeft"] === true &&
                        pressedKeys[key] === true
                    )
                        callback();
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
        [callback, key],
    );
}

export {useCtrl}