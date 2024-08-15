import "./Dot.css";
import { useNote } from "../contexts/NoteContext";

export const colors = {
  blue: "#285cbb",
  red: "#e85353",
  green: "#128e39",
  undefined: 'grey'
};

export default function Dot({ cssClass, color }) {
  const { dispatch } = useNote();

  return (
    <span
      className={cssClass}
      onClick={() => dispatch({ type: "dot/color-switch", payload: color })}
    ></span>
  );
}
