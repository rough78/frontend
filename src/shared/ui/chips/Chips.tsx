import styles from "./Chips.module.scss";

const Chips = () => {
  return (
    <div className={styles.chips}>
      <img src="/src/shared/assets/images/chips.svg" alt="location-icon" />
      <p>기미사 성수</p>
    </div>
  );
};

export default Chips;
