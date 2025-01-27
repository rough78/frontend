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
import Modal from "@shared/ui/modal/Modal";
import styles from "./styles/CafeSearch.module.scss";

const CafeSearch = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { updateDraft } = useReviewDraftStore();
  const { returnPath, setReturnPath, isFromFooter, setIsFromFooter } = useNavigationStore();
  const { searchByName, isLoading, error } = useCafeSearch();
  const { checkCafeExists, saveCafe } = useCafeApi();
  const { useUserDraftReviews, createDraft } = useReviewDraftApi();
  const [cafes, setCafes] = useState<ICafeDescription[]>([]);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState<{
    cafe: ICafeDescription;
    cafeId: number;
  } | null>(null);

  useEffect(() => {
    console.log('selectedCafe updated:', selectedCafe);
  }, [selectedCafe]);

  const draftsQuery = useUserDraftReviews(selectedCafe?.cafeId, {
    enabled: selectedCafe !== null && 
            typeof selectedCafe?.cafeId === 'number' &&
            selectedCafe.cafeId > 0 // cafeId가 유효한 값인 경우에만 쿼리 실행
  });

  const handleCafeSelect = async (cafe: ICafeDescription) => {
    try {
      const { cafeId, exist } = await checkCafeExists({
        name: cafe.name,
        mapx: cafe.mapx,
        mapy: cafe.mapy,
      });
    
      // First ensure cafeId is defined
      if (typeof cafeId === 'undefined') {
        console.error("카페 ID가 정의되지 않았습니다.");
        return;
      }
  
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
  
      // At this point selectedCafeId is guaranteed to be a number
      if (isFromFooter) {
        navigate(`/cafe/${selectedCafeId}`);
        return;
      }
  
      setSelectedCafe({ cafe, cafeId: selectedCafeId });
    } catch (error) {
      console.error("카페 선택 중 오류 발생:", error);
    }
  };

  const handleNewDraft = async (cafe: ICafeDescription, cafeId: number) => {
    setIsFromFooter(false);
    setReturnPath(returnPath || "/");
    
    updateDraft({ 
      cafe: {
        ...cafe,
        id: cafeId
      }
    });
  
    try {
      const response = await createDraft({
        cafeId: cafeId,
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
          id: cafeId
        }
      });

      setShouldNavigate(true);
    } catch (error) {
      console.error('Draft 생성 실패:', error);
    }
  };

  const handleContinueWriting = () => {
    if (!selectedCafe) return;

    // draftsQuery 사용
    if (!draftsQuery.data) return;

    if (draftsQuery.data.length === 1) {
      // Single draft - go directly to WriteReview
      const draft = draftsQuery.data[0];
      updateDraft({
        id: draft.draftReviewId,
        cafe: {
          id: selectedCafe.cafeId,
          name: draft.cafeName
        }
      });
      navigate('/review/write', { 
        replace: true,
        state: { from: '/search' }
      });
    } else {
      // Multiple drafts - go to DraftReview
      navigate('/draft', { 
        state: { cafeId: selectedCafe.cafeId }
      });
    }
    setIsModalOpen(false);
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

  useEffect(() => {
    // selectedCafe와 draftsQuery.data가 모두 있을 때만 실행
    if (!selectedCafe || !draftsQuery.data) return;
    
    if (draftsQuery.data.length > 0 && !shouldNavigate) {
      // shouldNavigate가 false일 때만 모달 표시
      setIsModalOpen(true);
    } else {
      handleNewDraft(selectedCafe.cafe, selectedCafe.cafeId);
    }
  }, [draftsQuery.data, selectedCafe, shouldNavigate]);

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
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${selectedCafe?.cafe.name}의 리뷰를 이어서 작성하시겠어요?`}
        primaryButton={{
          text: "새로 작성하기",
          onClick: () => {
            // setIsModalOpen(false);
            if (selectedCafe) {
              handleNewDraft(selectedCafe.cafe, selectedCafe.cafeId);
            }
          },
          className: "modal-btn modal-btn-no",
        }}
        secondaryButton={{
          text: "이어서 작성하기",
          onClick: handleContinueWriting,
          className: "modal-btn modal-btn-yes",
        }}
      />
    </div>
  );
};

export default CafeSearch;