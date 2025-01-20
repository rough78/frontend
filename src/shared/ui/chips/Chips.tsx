import styles from "./Chips.module.scss";
import ChipsImage from "@shared/assets/images/chips.svg";

interface ChipsProps {
  cafeName: string;
}

const Chips: React.FC<ChipsProps> = ({ cafeName }) => {
  return (
    <div className={styles.chips}>
      <img src={ChipsImage} alt="location-icon" />
      <p>{cafeName}</p>
    </div>
  );
};

export default Chips;
