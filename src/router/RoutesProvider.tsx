import React from 'react';
import { FC } from 'react';
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
import {MainPage} from "../common/components/mainPage/MainPage";


export const RoutesProvider: FC = () => {


    const authorizedRouter = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<Layout /> }>

    <Route path='user/' element={<UserModule />}>

    <Route index element={<MainPage />} />
    {/* <Route path=':eventId' element={<EventDetailsPage />} />*/}

    </Route>

    <Route path='tasks' element={<Outlet />}>

    </Route>

    {/* <Route path='settings' element={<SettingsPage />} />*/}

    <Route path='*' element={<Navigate to='/events' />} />
    </Route>
)
);

    const unAuthorizedRouter = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<Outlet />}>
    {/* <Route path='login' element={<LoginPage />} />*/}
    {/* <Route path='register' element={<RegisterPage />} />*/}
    <Route path='*' element={<Navigate to='/login' />} />
    </Route>
)
);
    return <RouterProvider router={authorizedRouter} />;
    /* return <RouterProvider router={isAuthorized ? authorizedRouter : unAuthorizedRouter} />;*/
};
