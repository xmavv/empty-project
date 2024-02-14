export default function Button({ children, onClick, absolute }) {
  return (
    <button className={`btn ${absolute}`} onClick={onClick}>
      {children}
    </button>
  );
}
