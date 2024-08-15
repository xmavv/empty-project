import './Dot.css'
import {useNote} from "../contexts/NoteContext";

export default function Dot({ cssClass, color }) {
  const { dispatch } = useNote();

  return <span className={cssClass} onClick={() => dispatch({type: "dot/color-switch", payload: color})}></span>;
}
