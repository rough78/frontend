import { useState, useEffect } from "react";
import { throttle } from "lodash";
import { ProfileHeader, FilterBtn } from "@/entities/profile/ui";
import { ReviewList } from "@/widgets/reviewList";

const MyPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }, 250);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <ProfileHeader isScrolled={isScrolled} />
      <FilterBtn />
      <ReviewList />
    </div>
  );
};

export default MyPage;
