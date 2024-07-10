import './Dot.css'
import {useNote} from "../contexts/NoteContext";

export default function Dot({ setColor, cssClass, color }) {
  const { dispatch } = useNote();

  // function changeColor(color) {
  //   if (!color) return;
  //
  //   switch (color) {
  //     case "undefined":
  //       setColor("red");
  //       break;
  //     case "red":
  //       setColor("green");
  //       break;
  //     case "green":
  //       setColor("blue");
  //       break;
  //     case "blue":
  //       setColor("red");
  //       break;
  //     default:
  //       setColor("undefined");
  //       break;
  //   }
  // }

  return <span className={cssClass} onClick={() => dispatch({type: "dot/color-switch", payload: color})}></span>;
}
