import CafeItem from "@entities/cafeListItem/CafeListItem";
import styles from "./CafeList.module.scss";

export const CafeList = ({
  cafeInfo,
}: {
  cafeInfo: { name: string; address: string; profileImg: string }[];
}) => (
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
