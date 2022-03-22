import { Route, Redirect, RouteProps } from 'react-router-dom';
import { FunctionComponent } from 'react';
import { useAppSelector } from '../../services/store';

export const ProtectedRoute: FunctionComponent<RouteProps> = ({ children, path }) => {
    const auth = useAppSelector(store => store.auth);

    return (
        <Route
            path={path}
            render={({ location }) => {
                return auth.loading !== null && !auth.loading &&
                    (auth.user
                        ? (children)
                        : (<Redirect to={{ pathname: '/login', state: { from: location } }} />))
            }
            }
        />
    );
}