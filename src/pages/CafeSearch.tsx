import { Link } from 'react-router-dom';

const CafeSearch = () => {
  return (
    <div>
      <h1>카페 검색 페이지</h1>
      <div>
        <Link to="/">메인으로 이동</Link>
        <br />
        <Link to="/mypage">마이페이지</Link>
      </div>
    </div>
  );
};

export default CafeSearch;
