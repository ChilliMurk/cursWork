import {FC} from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Outlet,
    Route,
    RouterProvider,
} from 'react-router-dom';
import {Layout} from "./Layout";
import {UserModule} from "../modules/user/UserModule";
import {UserDashboard} from "@/common/components/userDashboard/UserDashboard.tsx";
import {MainPage} from "@/common/components/mainPage/MainPage.tsx";

export const RoutesProvider: FC = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Layout/>}>
                <Route index element={<MainPage/>}/>

                <Route path="user/*" element={<UserModule/>}>
                    <Route index element={<UserDashboard/>}/>
                </Route>

                <Route path="tasks" element={<Outlet/>}>
                    <Route index element={<div>Tasks Page</div>}/>
                </Route>

                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Route>
        )
    );

    return <RouterProvider router={router}/>;
};
