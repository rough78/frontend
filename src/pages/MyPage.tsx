import { useState, useEffect } from "react";
import { throttle } from "lodash";
import { ProfileHeader } from "@/entities/profile/ui";

const MyPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.scrollY > 40) {
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
      <div style={{ backgroundColor: "lightblue", height: "2000px" }}></div>
    </div>
  );
};

export default MyPage;
