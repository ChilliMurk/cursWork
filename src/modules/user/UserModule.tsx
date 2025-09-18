import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const UserModule: FC = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};
