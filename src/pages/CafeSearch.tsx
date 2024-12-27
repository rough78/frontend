import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CafeList } from "@widgets/cafeList";
import { SearchBar } from "@features/search/ui/SearchBar";
import { searchCafes } from "@shared/api/cafe/cafeSearch";
import type { ICafeDescription } from "@shared/api/cafe/types";

const CafeSearch = () => {
  const [searchParams] = useSearchParams();
  const [cafes, setCafes] = useState<ICafeDescription[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const query = searchParams.get('query');
    if (query) {
      const fetchCafes = async () => {
        try {
          setIsLoading(true);
          const response = await searchCafes(query);
          setCafes(response);
        } catch (error) {
          console.error('Failed to fetch cafes:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchCafes();
    }
  }, [searchParams]);

  return (
    <div>
      <SearchBar />
      {isLoading ? (
        <div>검색 중...</div>
      ) : (
        <CafeList cafeInfo={cafes} />
      )}
    </div>
  );
};

export default CafeSearch;
