import styles from "./UserInstructions.module.css";
import {useNote} from "../contexts/NoteContext";
import Button from "./Button";
import {useNavigate} from "react-router-dom";

const userInstructions = [
  {
    action: "delete note",
    key: "DELETE",
  },
  {
    action: "add note",
    key: "INSERT",
  },
  {
    action: "submit note to list",
    key: "(while typing title) ENTER",
  },
  {
    action: "download note",
    key: "CTRL + S",
  },
  {
    action: "switch theme",
    key: "CTRL + M",
  },
];

export default function UserInstructions() {
  const navigate = useNavigate();
  const { isDark } = useNote();

  return (
    <div className={styles.userInstructions}
         onClick={(e) => e.stopPropagation()}
         data-theme={isDark ? "dark" : "light"}>
      {/* in the capturing phase it says stop capturing when clicking on div in
      modal, wiec gdy wychodzi z tego i wchodzi do modala to i tak juz jest
      stopPropagation wiec nie wykona sie tamten handler w modalu */}
      <h2 className="heading-secondary">USER INSTRUCTIONS</h2>
      <div>
        <ul className={styles.instructionList}>
          {userInstructions.map((instruction) => (
            <li className={styles.instructionListItem}>
              <div className={styles.instructionListItemSpace}>
                <p>{instruction.action}</p>
                <span className={styles.highlight}>{instruction.key}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Button
        position={"absolute"}
        direction={"right"}
        onClick={() => navigate(-1)}
      >
        <span>&#x25c0;</span> BACK
      </Button>
    </div>
  );
}
