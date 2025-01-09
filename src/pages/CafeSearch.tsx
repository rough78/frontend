import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CafeList } from "@widgets/cafeList";
import { SearchBar } from "@features/search/ui/SearchBar";
import { searchCafes } from "@shared/api/cafe/cafeSearch";
import { useReviewDraftStore } from "@shared/store/useReviewDraftStore";
import { useNavigationStore } from "@shared/store/useNavigationStore";
import type { ICafeDescription } from "@shared/api/cafe/types";
import styles from "./styles/CafeSearch.module.scss";

const CafeSearch = () => {
  const [searchParams] = useSearchParams();
  const [cafes, setCafes] = useState<ICafeDescription[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { updateDraft } = useReviewDraftStore();
  const { returnPath, setReturnPath, isFromFooter, setIsFromFooter } = useNavigationStore();

  const handleCafeSelect = (cafe: ICafeDescription) => {
    if (isFromFooter) {
      setIsFromFooter(false); // cleanup
      navigate(`/cafe/${cafe.id}`);
    } else {
      setReturnPath(returnPath || "/"); // 이전 경로가 없으면 홈으로
      updateDraft({ 
        cafe: {
          id: cafe.id,
          name: cafe.name,
          address: cafe.address,
          location: cafe.location,
          instaLink: cafe.instaLink,
          isBookmark: cafe.isBookmark,
          avgStar: cafe.avgStar,
          profileImg: cafe.profileImg,
        } 
      });
      navigate('/review/write');
    }
  };

  const fetchCafes = async () => {
    const query = searchParams.get('query');
    if (!query) return;
        
    setIsLoading(true);
    setError(null);
    try {
      // Call searchCafes which transforms the Naver API response 
      // into ICafeDescription[] format
      const result = await searchCafes(query);
      setCafes(result);
      console.log('Cafes:', result);
    } catch (err) {
      setError('카페 검색 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // Use useEffect to trigger search when query changes
  useEffect(() => {
    fetchCafes();
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
        <CafeList cafeInfo={cafes} onCafeSelect={handleCafeSelect} />
      )}
    </div>
  );
};

export default CafeSearch;
