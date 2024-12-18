import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import CafeSearch from '@/pages/CafeSearch';
import WriteReview from '@/pages/WriteReview';
import CafeInfo from '@/pages/CafeInfo';
import MyPage from '@/pages/MyPage';

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/", element: <Home /> },
  { path: "/search", element: <CafeSearch /> },
  { path: "/review/write", element: <WriteReview /> },
  { path: "/cafe/:id", element: <CafeInfo /> },
  { path: "/mypage", element: <MyPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
