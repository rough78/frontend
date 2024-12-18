import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>메인 페이지</h1>
      <div>
        <Link to="/mypage">마이페이지</Link>
        <br />
        <Link to="/review/write">리뷰작성</Link>
      </div>
    </div>
  );
};

export default Home;
