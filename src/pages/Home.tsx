import { Link } from "react-router-dom";
import Button from "@shared/ui/button/Button";
const Home = () => {
  return (
    <div>
      <h1>메인 페이지</h1>
      <div>
        <Link to="/mypage">마이페이지</Link>
        <br />
        <Link to="/review/write">리뷰작성</Link>
      </div>
      <Button></Button>
    </div>
  );
};

export default Home;
