import NoteList from "./NoteList";
import NoteInput from "./NoteInput";
import Toggle from "./Toggle";
import MyToaster from "./MyToaster";
import KeyInstructions from "./KeyInstructions";
import styles from "./App.module.css";

import { useDark } from "../hooks/useDark";
import { useNote } from "../contexts/NoteContext";

export default function App() {
  const { isDark } = useNote();
  useDark(isDark);

  return (
    <main className={styles.app} data-theme={isDark ? "dark" : "light"}>
      <div className={styles.container}>
        <NoteList />
        <NoteInput />
      </div>
      <MyToaster />
      <footer>
        <KeyInstructions />
        <Toggle />
      </footer>
    </main>
  );
}
