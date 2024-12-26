import {
    createBrowserRouter,
    createRoutesFromElements,
    Link,
    Outlet,
    Route,
    RouterProvider,
} from 'react-router-dom'
import MainLayout from '@app/layout/mainLayout/MainLayout'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import CafeSearch from '@/pages/CafeSearch'
import WriteReview from '@/pages/WriteReview'
import CafeInfo from '@/pages/CafeInfo'
import MyPage from '@/pages/MyPage'
import { ProtectedRoute } from '@app/routers/ProtectedRoute'

export const AppRouter = () => {
    const routes = createRoutesFromElements(
        <Route
            path='/'
            element={
                <MainLayout>
                    <Outlet />
                </MainLayout>
            }
            handle={{ crumb: <Link to='/'>Home</Link> }}
        >
            <Route path='login' element={<Login />} />
            <Route 
                index 
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } 
            />
            <Route
                path='search'
                element={
                    <ProtectedRoute>
                        <CafeSearch />
                    </ProtectedRoute>
                }
                handle={{
                    crumb: <Link to='/search'>카페 검색</Link>,
                }}
            />
            <Route
                path='review/write'
                element={
                    <ProtectedRoute>
                        <WriteReview />
                    </ProtectedRoute>
                }
                handle={{
                    crumb: <Link to='/review/write'>리뷰 작성</Link>,
                }}
            />
            <Route
                path='cafe/:id'
                element={
                    <ProtectedRoute>
                        <CafeInfo />
                    </ProtectedRoute>
                }
                handle={{
                    crumb: ({ params }: { params: { id: string } }) => (
                        <Link to={`/cafe/${params.id}`}>카페 정보</Link>
                    ),
                }}
            />
            <Route
                path='mypage'
                element={
                    <ProtectedRoute>
                        <MyPage />
                    </ProtectedRoute>
                }
                handle={{
                    crumb: <Link to='/mypage'>마이페이지</Link>,
                }}
            />
        </Route>
    )

    const router = createBrowserRouter(routes)

    return <RouterProvider router={router} />
}
