import styles from "./Modal.module.css";
import {useNavigate} from "react-router-dom";

export default function Modal({ children }) {
  const navigate = useNavigate();

  return (
    <div className={styles.modal} onClick={(e) => navigate(-1)}>
      {children}
    </div>
  );
}
