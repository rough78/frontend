import { useState, useEffect } from "react";
import { throttle } from "lodash";
import { ProfileHeader, FilterBtn } from "@/entities/profile/ui";
import { ReviewList } from "@/widgets/reviewList";

const MyPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }, 100);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <div style={{ height: "48px", backgroundColor: "#F9F8F6" }}></div>
      <ProfileHeader isScrolled={isScrolled} />
      <FilterBtn />
      <ReviewList />
    </div>
  );
};

export default MyPage;
