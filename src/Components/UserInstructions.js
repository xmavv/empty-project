import "./UserInstructions.css";

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
    action: "download note",
    key: "CTRL + S",
  },
  {
    action: "switch theme",
    key: "CTRL + M",
  },
];

export default function UserInstructions() {
  return (
    <div className="user-instructions" onClick={(e) => e.stopPropagation()}>
      {/* in the capturing phase it says stop capturing when clicking on div in
      modal, wiec gdy wychodzi z tego i wchodzi do modala to i tak juz jest
      stopPropagation wiec nie wykona sie tamten handler w modalu */}
      <h2 className="heading-secondary">USER INSTRUCTIONS</h2>
      <div>
        <ul className="instructionList">
          {userInstructions.map((instruction) => (
            <li className="instructionList__item">
              <div className="instructionList__item--space">
                <p>{instruction.action}</p>
                <span className="highlight">{instruction.key}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
