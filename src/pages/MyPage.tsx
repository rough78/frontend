import { Link } from 'react-router-dom';

const MyPage = () => {
  return (
    <div>
      <h1>마이 페이지</h1>
      <div>
        <Link to="/">메인으로 이동</Link>
        <br />
        <Link to="/review/write">리뷰작성</Link>
        <br />
        <Link to="/mypage">마이페이지</Link>
      </div>
    </div>
  );
};

export default MyPage;
