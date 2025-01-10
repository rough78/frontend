import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CafeList } from "@widgets/cafeList";
import { SearchBar } from "@features/search/ui/SearchBar";
import { useCafeSearch } from "@shared/api/cafe/cafeSearch";
import { useReviewDraftStore } from "@shared/store/useReviewDraftStore";
import { useNavigationStore } from "@shared/store/useNavigationStore";
import type { ICafeDescription } from "@shared/api/cafe/types";
import styles from "./styles/CafeSearch.module.scss";

const CafeSearch = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { updateDraft } = useReviewDraftStore();
  const { returnPath, setReturnPath, isFromFooter, setIsFromFooter } = useNavigationStore();
  const { searchByName, isLoading, error } = useCafeSearch();
  const [cafes, setCafes] = useState<ICafeDescription[]>([]);

  const handleCafeSelect = (cafe: ICafeDescription) => {
    if (isFromFooter) {
      setIsFromFooter(false);
      navigate(`/cafe/${cafe.id}`);
    } else {
      setReturnPath(returnPath || "/");
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

  useEffect(() => {
    const name = searchParams.get('name');
    searchByName(name).then(setCafes);
  }, [searchParams]); // searchByName 의존성 제거

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
          <p>카페 검색 중 오류가 발생했습니다.</p>
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