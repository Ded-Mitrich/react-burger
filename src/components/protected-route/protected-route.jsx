import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedRoute({ children, ...rest }) {
    const auth = useSelector(store => store.auth);

    return (
        <Route
            {...rest}
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