import styles from "./Modal.module.css";

export default function Modal({ children, onShowModal }) {
  return (
    <div className={styles.modal} onClick={(e) => onShowModal((s) => !s)}>
      {children}
    </div>
  );
}
