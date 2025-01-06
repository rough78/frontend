import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "@app/layout/mainLayout/MainLayout";
import Login from "@/pages/Login";
import Main from "@/pages/Main";
import CafeSearch from "@/pages/CafeSearch";
import WriteReview from "@/pages/WriteReview";
import CafeInfo from "@/pages/CafeInfo";
import MyPage from "@/pages/MyPage";
import { ProtectedRoute } from "@app/routers/ProtectedRoute";
import styles from "@app/layout/header/Header.module.scss";


export const AppRouter = () => {
  const routes = createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route
        path="login"
        element={
          <MainLayout
            showHeader={false}
            showFooter={false}
            showBackButton={false}
            headerTitle="로그인"
          >
            <Login />
          </MainLayout>
        }
      />

      <Route
        element={
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={
            <MainLayout
              showHeader={false}
              showFooter={true}
              showBackButton={false}
              headerTitle="리뷰 목록"
            >
              <Main />
            </MainLayout>
          }
          handle={{ crumb: <Link to="/">Main</Link> }}
        />
        <Route
          path="search"
          element={
            <MainLayout
              showHeader={true}
              showFooter={true}
              showBackButton={true}
              headerTitle="장소 검색"
              rightElement={
                <button
                  className={styles.completeButton}
                  onClick={() => {
                    /* 이벤트 처리 */
                  }}
                >
                  완료
                </button>
              }
            >
              <CafeSearch />
            </MainLayout>
          }
          handle={{ crumb: <Link to="/search">카페 검색</Link> }}
        />
        <Route
          path="review/write"
          element={
            <MainLayout
              showHeader={true}
              showFooter={false}
              showBackButton={true}
              headerTitle="리뷰 작성"
            >
              <WriteReview />
            </MainLayout>
          }
          handle={{ crumb: <Link to="/review/write">리뷰 작성</Link> }}
        />
        <Route
          path="cafe/:id"
          element={
            <MainLayout
              showHeader={true}
              showFooter={true}
              showBackButton={true}
              headerTitle="카페 정보"
            >
              <CafeInfo />
            </MainLayout>
          }
          handle={{ crumb: <Link to="/cafe">카페 정보</Link> }}
        />
        <Route
          path="mypage"
          element={
            <MainLayout
              showHeader={true}
              showFooter={true}
              showBackButton={true}
              headerTitle="마이페이지"
            >
              <MyPage />
            </MainLayout>
          }
          handle={{ crumb: <Link to="/mypage">마이페이지</Link> }}
        />
      </Route>
    </Route>
  );

  return <RouterProvider router={createBrowserRouter(routes)} />;
};
