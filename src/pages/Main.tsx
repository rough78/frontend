import { ReviewList } from "@/widgets/reviewList";
import ReviewFilter from "@/entities/review/ui/reviewFilter/ReviewFilter";

const Main = () => {
  return (
    <div>
      <ReviewFilter />
      <ReviewList type="all" params={{ sort: "NEW", limit: 10 }} />
    </div>
  );
};

export default Main;
