import { ReviewItem } from "@/entities/review/ui";
import ReviewFilter from "@/entities/review/ui/reviewFilter/ReviewFilter";

const ReviewList = () => {
  return (
    <div>
      <ReviewFilter />
      <ReviewItem />
    </div>
  );
};

export default ReviewList;
