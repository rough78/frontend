import ReviewerInfo from "../reviewerInfo/ReviewerInfo";
import PhotoSwiper from "@shared/ui/photoSwiper/PhotoSwiper.tsx";
import ReviewContent from "../reviewContent/reviewContent";
import ReviewTagList from "../reviewTagList/ReviewTagList";

const ReviewItem = () => {
  return (
    <div>
      <ReviewerInfo />
      <PhotoSwiper />
      <ReviewContent />
      <ReviewTagList />
    </div>
  );
};

export default ReviewItem;
