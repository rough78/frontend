import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import CafeSearch from '@/pages/CafeSearch';
import WriteReview from '@/pages/WriteReview';
import CafeInfo from '@/pages/CafeInfo';
import MyPage from '@/pages/MyPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<CafeSearch />} />
        <Route path="/review/write" element={<WriteReview />} />
        <Route path="/cafe/:id" element={<CafeInfo />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
