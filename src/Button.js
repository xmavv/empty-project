export default function Button({ children, onClick, absolute, direction }) {
  return (
    <button className={`btn ${absolute} ${direction}`} onClick={onClick}>
      {children}
    </button>
  );
}
