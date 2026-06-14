import {FC, useEffect, useState} from 'react';
import {Outlet, useNavigate, useLocation} from 'react-router-dom';
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";

export const Layout: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isChecking, setIsChecking] = useState(true);

    const authState = useAppSelector((state) => state.authReducer);
    const isAuthenticated = authState?.isAuthenticated ?? false;
    const user = authState?.user;

    useEffect(() => {
        console.log('Layout - isAuthenticated:', isAuthenticated);
        console.log('Layout - user:', user);
        console.log('Layout - location:', location.pathname);
    }, [isAuthenticated, user, location]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsChecking(false);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isChecking) return;

        const publicPaths = ['/'];
        const isPublicPath = publicPaths.includes(location.pathname);

        console.log('Layout - checking navigation:', { isAuthenticated, isPublicPath, location: location.pathname });

        if (!isAuthenticated && !isPublicPath) {
            console.log('Layout - redirecting to / (not authenticated)');
            navigate('/', {replace: true});
            return;
        }

        if (isAuthenticated && location.pathname === '/') {
            console.log('Layout - redirecting to /user (authenticated on home)');
            navigate('/user', {replace: true});
            return;
        }

        if (isAuthenticated && location.pathname === '/login') {
            console.log('Layout - redirecting to /user (authenticated on login)');
            navigate('/user', {replace: true});
            return;
        }
    }, [isAuthenticated, location.pathname, navigate, isChecking]);

    if (isChecking) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: '#0a1929',
                color: '#00e6ff'
            }}>
                <i className="fas fa-spinner fa-spin" style={{fontSize: '2rem'}}></i>
            </div>
        );
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};
