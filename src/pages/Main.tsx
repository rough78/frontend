import { ReviewList } from "@/widgets/reviewList";
import ReviewFilter from "@/entities/review/ui/reviewFilter/ReviewFilter";

const Main = () => {
  return (
    <div>
      <ReviewFilter />
      <ReviewList />
    </div>
  );
};

export default Main;
