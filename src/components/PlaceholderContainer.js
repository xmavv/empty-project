import PlaceholderContainerItem from "./PlaceholderContainerItem";

export default function PlaceholderContainer() {
  return (
    <div className="placeholderContainer">
      <PlaceholderContainerItem dotColor={"red"} />
      <PlaceholderContainerItem dotColor={"green"} />
      <PlaceholderContainerItem dotColor={"blue"} />
    </div>
  );
}
