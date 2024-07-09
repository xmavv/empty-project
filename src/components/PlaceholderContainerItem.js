import { useState } from "react";
import Dot from "./Dot";

export default function PlaceholderContainerItem({ dotColor }) {
  const [dotPlaceholder, setDotPlaceholder] = useState(
    localStorage.getItem(`dot-${dotColor}`) || ""
  );

  function handleDotPlaceholderChange(e) {
    setDotPlaceholder(e.target.value);

    localStorage.setItem(`dot-${dotColor}`, e.target.value);
  }

  return (
    <div>
      <Dot cssClass={`dot ${dotColor}`} />
      <input
        value={dotPlaceholder}
        onChange={(e) => handleDotPlaceholderChange(e)}
        className="placeholder__item"
        placeholder={`Name type for ${dotColor} dot!`}
        data-color={`${dotColor}`}
      ></input>
    </div>
  );
}
