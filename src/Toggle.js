import "./Toggle.css";

export default function Toggle({ isChecked, onChange }) {
  return (
    <div className="toggle-container">
      {/* robimy input checkbox tutaj bo ciezko by bylo ostylowac taki fajny slider w inny sposob */}
      <input
        type="checkbox"
        id="check"
        className="toggle"
        onChange={onChange}
        checked={isChecked}
      />
      <label htmlFor="check" aria-label="Switch to dark mode">
        {isChecked ? "LIGHT MODE" : "DARK MODE"}
      </label>
    </div>
  );
}
