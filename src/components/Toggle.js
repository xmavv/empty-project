import styles from "./Toggle.module.css";
import {useNote} from "../contexts/NoteContext";

export default function Toggle() {
    const { isDark, dispatch } = useNote();

  return (
    <div className={styles.toggleContainer}>
      {/* robimy input checkbox tutaj bo ciezko by bylo ostylowac taki fajny slider w inny sposob */}
      <input
        type="checkbox"
        id="check"
        className={styles.toggle}
        onChange={() => dispatch({type: "theme/switch"})}
        checked={isDark}
      />
      <label htmlFor="check" aria-label="Switch to dark mode">
        {isDark ? "LIGHT MODE" : "DARK MODE"}
      </label>
    </div>
  );
}
