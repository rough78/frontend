import ReviewerInfo from "../reviewerInfo/ReviewerInfo";
import PhotoSwiper from "../../../../shared/ui/photoSwiper/PhotoSwiper.tsx";
import ReviewContent from "../reviewContent/reviewContent";

const ReviewItem = () => {
  return (
    <div>
      <ReviewerInfo />
      <PhotoSwiper />
      <ReviewContent />
    </div>
  );
};

export default ReviewItem;
