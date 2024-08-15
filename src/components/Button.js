import './Button.css'

export default function Button({ children, onClick, position, direction }) {
  return (
    <button className={`btn ${position} ${direction}`} onClick={onClick}>
      {children}
    </button>
  );
}
