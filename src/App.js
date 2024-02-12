import NoteList from "./NoteList";
import NoteInput from "./NoteInput";

const notes = [
  {
    title: "ja jestem mega szefem i robie se treninng nie",
    description: "cosik se tu napisalem xd1",
    color: "red",
  },
  {
    title: "w sumie fajnie se tak poprogramowac hahfa",
    description: "cosik se tu napisalem xd2",
    color: "blue",
  },
  {
    title: "porobie to na studia i zdam ten przedmiuot",
    description: "cosik se tu napisalem xd3",
    color: "green",
  },
  {
    title:
      "robie sobie strima ziomek potem lcize se zielone odpalam go lada momeny, robie ziome ta mamone",
    description: "cosik se tu napisalem xd4",
    color: "green",
  },
  {
    title: "hahahahahaha olaf nobas",
    description: "cosik se tu napisalem xd5",
    color: "green",
  },
];

export default function App() {
  return (
    <div>
      <h1 className="heading-primary">📝 Your personal notebook</h1>
      <div className="container">
        <NoteList notes={notes} />
        <NoteInput />
      </div>
    </div>
  );
}
