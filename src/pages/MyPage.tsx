import { useState, useEffect } from "react";
import { throttle } from "lodash";
import { ProfileHeader, FilterBtn } from "@/entities/profile/ui";
import { ReviewList } from "@/widgets/reviewList";
import Modal from "@/shared/ui/modal/Modal";

const MyPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <ProfileHeader isScrolled={isScrolled} />
      <FilterBtn />
      <ReviewList />
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="정말 나가시겠어요?"
        description="작성 중인 내용은 임시 저장되어 다음에 이어서 작성할 수 있어요."
        primaryButton={{
          text: "나가기",
          altText: "나가기",
          onClick: closeModal,
          className: "modal-btn modal-btn-yes",
        }}
        secondaryButton={{
          text: "계속 작성하기",
          altText: "계속 작성하기",
          onClick: closeModal,
          className: "modal-btn modal-btn-no",
        }}
      />
    </div>
  );
};

export default MyPage;
