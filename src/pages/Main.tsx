import { useState } from "react";
import { ReviewList } from "@/widgets/reviewList";
import ReviewFilter from "@/entities/review/ui/reviewFilter/ReviewFilter";

const Main = () => {
  const [sortType, setSortType] = useState<"NEW" | "HIGH_RATING">("NEW");

  const handleSortChange = (filter: "latest" | "highRating") => {
    setSortType(filter === "latest" ? "NEW" : "HIGH_RATING");
  };

  return (
    <div>
      <ReviewFilter onSortChange={handleSortChange} />
      <ReviewList 
        type="all" 
        params={{ 
          sort: sortType, 
          limit: 10 
        }}
        key={sortType}
      />
    </div>
  );
};

export default Main;
