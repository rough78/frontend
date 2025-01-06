import styles from "./FilterBtn.module.scss";
import Button from "@/shared/ui/button/ui/Button";
import { useState } from "react";

interface FilterType {
  type: "review" | "scrap";
}

const FilterBtn: React.FC = () => {
  const [activeButton, setActiveButton] = useState<FilterType>({
    type: "review",
  });

  const handleClick = (button: FilterType["type"]): void => {
    setActiveButton({ type: button });
  };

  return (
    <div className={styles.filterBtnWrap}>
      <Button
        className={`${styles.reviewFilterBtn} ${
          activeButton.type === "review" ? styles["reviewFilterBtn--on"] : ""
        }`}
        text="내가 작성한 리뷰"
        onClick={() => handleClick("review")}
      />
      <Button
        className={`${styles.reviewFilterBtn} ${
          activeButton.type === "scrap" ? styles["reviewFilterBtn--on"] : ""
        }`}
        text="스크랩한 장소"
        onClick={() => handleClick("scrap")}
      />
    </div>
  );
};

export default FilterBtn;
