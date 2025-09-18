import {FC} from 'react';
import {Outlet} from 'react-router-dom';

//import { useAppSelector } from '@/common/hooks/useAppSelector';
//import { useIsAuthorized } from '@/store/reducers/userSlice';


export const Layout: FC = () => {
    // const { secondaryUserRoutes } = useAppSelector((state) => state.routerReducer);
    //const isAuthorized = useIsAuthorized();
    // const navigate = useNavigate();
    // const location = useLocation();

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
