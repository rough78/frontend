import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CafeList } from "@widgets/cafeList";
import { SearchBar } from "@features/search/ui/SearchBar";
import { useCafeSearch } from "@shared/api/cafe/cafeSearch";
import { useReviewDraftStore } from "@shared/store/useReviewDraftStore";
import { useNavigationStore } from "@shared/store/useNavigationStore";
import type { ICafeDescription } from "@shared/api/cafe/types";
import { useCafeApi } from "@/shared/api/cafe/cafe";
import { useReviewDraftApi } from "@shared/api/reviews/reviewDraftApi";
import styles from "./styles/CafeSearch.module.scss";

const CafeSearch = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { updateDraft } = useReviewDraftStore();
  const { returnPath, setReturnPath, isFromFooter, setIsFromFooter } = useNavigationStore();
  const { searchByName, isLoading, error } = useCafeSearch();
  const { checkCafeExists, saveCafe } = useCafeApi();
  const { createDraft } = useReviewDraftApi();
  const [cafes, setCafes] = useState<ICafeDescription[]>([]);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const handleCafeSelect = async (cafe: ICafeDescription) => {
    try {
      const { cafeId, exist } = await checkCafeExists({
        name: cafe.name,
        mapx: cafe.mapx,
        mapy: cafe.mapy,
      });
  
      let selectedCafeId = cafeId;
  
      if (!exist) {
        const saveResponse = await saveCafe({
          title: cafe.name,
          category: cafe.category,
          mapx: cafe.mapx,
          mapy: cafe.mapy,
          address: cafe.address,
          roadAddress: cafe.roadAddress,
          link: cafe.link,
        });
  
        if (saveResponse.cafeId) {
          selectedCafeId = saveResponse.cafeId;
        } else {
          console.error("카페 저장 실패");
          return;
        }
      }
  
      if (!selectedCafeId) {
        console.error("카페 ID가 없습니다.");
        return;
      }

      if (isFromFooter) {
        navigate(`/cafe/${selectedCafeId}`);
      } else {
        setIsFromFooter(false);
        setReturnPath(returnPath || "/");
        
        updateDraft({ 
          cafe: {
            ...cafe,
            id: selectedCafeId
          }
        });
      
        try {
          const response = await createDraft({
            cafeId: selectedCafeId,
            rating: 0,
            visitDate: '',
            content: '',
            imageIds: [],
            tagIds: []
          });

          await updateDraft({ 
            id: response.draftReviewId,
            cafe: {
              ...cafe,
              id: selectedCafeId
            }
          });

          setShouldNavigate(true);

        } catch (error) {
          console.error('Draft 생성 실패:', error);
        }
      }
    } catch (error) {
      console.error("카페 선택 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (shouldNavigate) {
      navigate('/review/write', {
        replace: true,
        state: { from: '/search' }
      });
      setShouldNavigate(false);
    }
  }, [shouldNavigate, navigate]);

  useEffect(() => {
    const name = searchParams.get('name');
    searchByName(name).then(setCafes);
  }, [searchParams]); // searchByName 의존성 제거

  return (
    <div className={styles.searchPage}>
      <div className={styles.searchBarWrapper}>
        <SearchBar />
      </div>
      <div className={styles.cafeListContainer}>
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
    </div>
  );
};

export default CafeSearch;