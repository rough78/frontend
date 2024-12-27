import CafeItem from "@entities/cafeListItem/CafeListItem";
import styles from "./CafeList.module.scss";
import { ICafeDescription } from "@shared/api/cafe/types";

interface CafeListProps {
  cafeInfo: ICafeDescription[];
}

export const CafeList = ({
  cafeInfo,
}: CafeListProps) => (
  <ul className={styles.cafeList}>
    {cafeInfo.map((cafe) => (
      <CafeItem
        key={cafe.name}
        name={cafe.name}
        address={cafe.address}
        profileImg={cafe.profileImg}
      />
    ))}
  </ul>
);
