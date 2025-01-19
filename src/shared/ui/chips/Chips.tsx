import styles from "./Chips.module.scss";
import ChipsImage from "@shared/assets/images/chips.svg";

const Chips = () => {
  return (
    <div className={styles.chips}>
      <img src={ChipsImage} alt="location-icon" />
      <p>기미사 성수</p>
    </div>
  );
};

export default Chips;
