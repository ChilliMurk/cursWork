/*
import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { hasPermission } from '@/utils/permissions';

interface PrivateRouteProps {
    element: React.ReactNode;
    permissions?: Permissions[];
    redirectRoute?: string;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({
                                                        element,
                                                        permissions = [],
                                                        redirectRoute = '/login'
                                                    }) => {
    const location = useLocation();
    const { isAuthorized, userPermissions } = useAppSelector(state => state.user);

    if (!isAuthorized) {
        return <Navigate to={redirectRoute} state={{ from: location }} replace />;
    }

    if (permissions.length > 0 && !hasPermission(userPermissions, permissions)) {
        return <Navigate to='/unauthorized' replace />;
    }

    return element;
};*/

