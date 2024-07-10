import {Toaster} from "sonner";
import {useNote} from "../contexts/NoteContext";

const themeColor = {
    dark: "#0b0b09",
    light: "#f6f6f6",
    primary: "#178ed3",
};

function MyToaster() {
    const {isDark} = useNote();

    return (
    <Toaster
        expand={true}
        duration={3000}
        position={window.innerWidth > 600 ? "bottom-right" : "top-center"}
        toastOptions={{
            style: {
                backgroundColor: isDark ? themeColor.dark : themeColor.light,
                color: themeColor.primary,
                border: `1px solid ${themeColor.primary}`,
                width: "27rem",
                right: "2rem",
                bottom: "2rem",
            },
        }}
    />
    )
}

export default MyToaster;