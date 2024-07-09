import styles from "./Toggle.module.css";

export default function Toggle({ isChecked, onChange }) {
  return (
    <div className={styles.toggleContainer}>
      {/* robimy input checkbox tutaj bo ciezko by bylo ostylowac taki fajny slider w inny sposob */}
      <input
        type="checkbox"
        id="check"
        className={styles.toggle}
        onChange={onChange}
        checked={isChecked}
      />
      <label htmlFor="check" aria-label="Switch to dark mode">
        {isChecked ? "LIGHT MODE" : "DARK MODE"}
      </label>
    </div>
  );
}
