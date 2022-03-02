import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FunctionComponent } from 'react';
import { IRootState } from '../../services/reducers';

export const ProtectedRoute: FunctionComponent<RouteProps> = ({ children, path }) => {
    const auth = useSelector((store: IRootState) => store.auth);

    return (
        <Route
            path={path}
            render={({ location }) => {
                console.log(auth.loading);
                return auth.loading !== null && !auth.loading &&
                    (auth.user
                        ? (children)
                        : (<Redirect to={{ pathname: '/login', state: { from: location } }} />))
            }
            }
        />
    );
}