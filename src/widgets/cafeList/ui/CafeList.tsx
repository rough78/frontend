import CafeItem from "@entities/cafeListItem/CafeListItem";
import styles from "./CafeList.module.scss";
import type { ICafeDescription } from "@shared/api/cafe/types";

interface CafeListProps {
  cafeInfo: ICafeDescription[];
  onCafeSelect: (cafe: ICafeDescription) => void;
}

export const CafeList = ({ cafeInfo, onCafeSelect }: CafeListProps) => (
  <ul className={styles.cafeList}>
    {cafeInfo?.length > 0 && cafeInfo.map((cafe) => (
      <CafeItem
        key={cafe.id}
        {...cafe}
        onSelect={() => onCafeSelect(cafe)}
      />
    ))}
  </ul>
);
