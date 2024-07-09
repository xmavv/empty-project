import "./Modal.css";

export default function Modal({ children, onShowModal }) {
  return (
    <div className="modal" onClick={(e) => onShowModal((s) => !s)}>
      {children}
    </div>
  );
}
