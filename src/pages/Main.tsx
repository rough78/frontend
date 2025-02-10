import { useState } from "react";
import { ReviewList } from "@/widgets/reviewList";
import ReviewFilter from "@/entities/review/ui/reviewFilter/ReviewFilter";
import { useQueryClient } from '@tanstack/react-query';

const Main = () => {
  const [sortType, setSortType] = useState<"NEW" | "HIGH_RATING">("NEW");
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  // 초기값을 백엔드 기본값과 동일하게 설정
  const [lastTimestamp, setLastTimestamp] = useState<string>(
    new Date(3000, 0, 1).toISOString()
  );
  const queryClient = useQueryClient();

  const handleSortChange = (filter: "latest" | "highRating") => {
    setSortType(filter === "latest" ? "NEW" : "HIGH_RATING");
    // 정렬 변경시 timestamp 초기화
    setLastTimestamp(new Date(3000, 0, 1).toISOString());
    invalidateReviewsQuery();
  };

  const handleTagsConfirm = (tags: { menu: number[]; interior: number[] }) => {
    const allTags = [...tags.menu, ...tags.interior];
    setSelectedTagIds(allTags);
    // 태그 변경시 timestamp 초기화
    setLastTimestamp(new Date(3000, 0, 1).toISOString());
    invalidateReviewsQuery();
  };

  const handleLoadMore = (timestamp: string) => {
    setLastTimestamp(timestamp);
  };

  const invalidateReviewsQuery = () => {
    queryClient.invalidateQueries({ 
      queryKey: ['reviews', 'list'] 
    });
  };

  return (
    <div>
      <ReviewFilter 
        onSortChange={handleSortChange} 
        onTagsConfirm={handleTagsConfirm}
      />
      <ReviewList 
        type="all" 
        params={{ 
          sort: sortType,
          limit: 10,
          tagIds: selectedTagIds,
          timestamp: lastTimestamp
        }}
        onLoadMore={handleLoadMore}
        key={`${sortType}-${selectedTagIds.join(',')}`}
      />
    </div>
  );
};

export default Main;
