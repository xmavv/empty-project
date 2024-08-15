import styles from "./App.module.css";
import {useNavigate} from "react-router-dom";

function KeyInstructions() {
    const navigate = useNavigate();

    return (
    <div className={styles.keyInstructions} onClick={() => navigate('/instructions')}>
        <p>
            <span>📝</span>KEY - INSTRUCTIONS
        </p>
    </div>
    )
}

export default KeyInstructions;