import { useNavigate } from 'react-router-dom';

const WriteReview = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <h1>리뷰 작성 페이지</h1>
      <div>
        <a href="#" onClick={() => navigate(-1)}>이전 화면으로</a>
      </div>
    </div>
  );
};

export default WriteReview;
