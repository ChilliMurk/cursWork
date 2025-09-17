/*
import {FC} from 'react';
import {Outlet} from 'react-router-dom';

import styled from 'styled-components';

const LayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const MainContent = styled.main`
    flex: 1;
    padding: 20px 0;
`;

export const Layout: FC = () => {
    return (
        <>
            <Outlet/>

        </>
    );
};
*/


import React from 'react';
import {FC, useEffect} from 'react';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';

//import { useAppSelector } from '@/common/hooks/useAppSelector';
//import { useIsAuthorized } from '@/store/reducers/userSlice';


export const Layout: FC = () => {
    // const { secondaryUserRoutes } = useAppSelector((state) => state.routerReducer);
    //const isAuthorized = useIsAuthorized();
    const navigate = useNavigate();
    const location = useLocation();

    // useEffect(() => {
    //     if (!isAuthorized) navigate('/login', { replace: true });
    // }, [isAuthorized]);

    // useEffect(() => {
    //     if (location.pathname === '/') navigate(secondaryUserRoutes.main);
    // }, [location.pathname]);

    return (
        <>
            <Outlet/>
        </>
    );
};
