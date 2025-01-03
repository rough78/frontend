import { ReviewItem } from "@/entities/review/ui";
import rateImage from "@/shared/assets/images/rate.svg";

const ReviewList = () => {
  return (
    <div>
      <img src={rateImage} alt="Star rating" />
      <ReviewItem />
    </div>
  );
};

export default ReviewList;
