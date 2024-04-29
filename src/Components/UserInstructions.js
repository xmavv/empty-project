import "./UserInstructions.css"

const userInstructions = [
    {
      action: 'delete note',
      key: 'DELETE'
    },
    {
      action: 'add note',
      key: 'INSERT'
    },
    {
      action: 'download',
      key: 'CTRL + S'
    },
  ];

export default function UserInstructions() {
    return (         
    <div className="user-instructions">
        <h2 className="heading-secondary">USER INSTRUCTIONS</h2>
        <div>
        <ul className="instructionList">
            {userInstructions.map(instruction => (
            <li className="instructionList__item">
                <div className="instructionList__item--space">
                    <p>{instruction.action}</p>
                    <span className="highlight">{instruction.key}</span>
                </div>
            </li>)
        )}
        </ul>   
        </div>
    </div> )
}