import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CafeList } from "@widgets/cafeList";
import { SearchBar } from "@features/search/ui/SearchBar";
import { searchCafes } from "@shared/api/cafe/cafeSearch";
import type { ICafeDescription } from "@shared/api/cafe/types";
import styles from "./styles/CafeSearch.module.scss";

const CafeSearch = () => {
  const [searchParams] = useSearchParams();
  const [cafes, setCafes] = useState<ICafeDescription[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const query = searchParams.get('query');
    if (query) {
      const fetchCafes = async () => {
        try {
          setError(null);
          setIsLoading(true);
          const response = await searchCafes(query);
          setCafes(response);
        } catch (error) {
          setError('검색 중 오류가 발생했습니다.');
          console.error('Failed to fetch cafes:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchCafes();
    }
  }, [searchParams]);

  return (
    <div className={styles.searchPage}>
      <SearchBar />
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>검색 중입니다...</p>
        </div>
      ) : error ? (
        <div className={styles.errorContainer}>
          <p>{error}</p>
        </div>
      ) : cafes.length === 0 ? (
        <div className={styles.noResults}>
          <p>검색 결과가 없습니다.</p>
        </div>
      ) : (
        <CafeList cafeInfo={cafes} />
      )}
    </div>
  );
};

export default CafeSearch;
