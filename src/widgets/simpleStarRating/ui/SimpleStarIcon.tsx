import StarEmpty from "@/shared/assets/images/star-rating/star.svg";
import StarFilled from "@/shared/assets/images/star-rating/star-filled.svg";

interface SimpleStarIconProps {
  filled: boolean;
  size: number;
}

const SimpleStarIcon = ({ filled, size }: SimpleStarIconProps) => (
  <li>
    <img
      src={filled ? StarFilled : StarEmpty}
      alt={filled ? "filled star" : "empty star"}
      style={{ width: `${size}px` }}
    />
  </li>
);

export default SimpleStarIcon;
