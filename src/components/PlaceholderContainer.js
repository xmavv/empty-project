import PlaceholderContainerItem from "./PlaceholderContainerItem";
import styles from './PlaceholderContainer.module.css'

export default function PlaceholderContainer() {
  return (
    <div className={styles.placeholderContainer}>
      <PlaceholderContainerItem dotColor={"red"} />
      <PlaceholderContainerItem dotColor={"green"} />
      <PlaceholderContainerItem dotColor={"blue"} />
    </div>
  );
}
