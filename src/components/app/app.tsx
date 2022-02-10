import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructorPage from '../../pages/burger-constructor-page';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from '../../pages/login-page';
import RegisterPage from '../../pages/register-page';
import ForgotPasswordPage from '../../pages/forgot-password-page';
import ResetPasswordPage from '../../pages/reset-password-page';
import ProfilePage from '../../pages/profile-page';
import NotFound404Page from '../../pages/not-found-page';
import IngredientInfoPage from '../../pages/ingredient-info-page';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAvalaibleIngredients, getUser } from '../../services/actions';
import { ProtectedRoute } from '../protected-route/protected-route';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
        dispatch(getAvalaibleIngredients());
    }, [])

    return (
        <>
            <Router>
                <AppHeader />
                <main className={styles.main}>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/constructor" />
                        </Route>
                        <Route path="/login">
                            <LoginPage />
                        </Route>
                        <Route path="/logout">
                            <Redirect to="/login" />
                        </Route>
                        <Route path="/register">
                            <RegisterPage />
                        </Route>
                        <Route path="/forgot-password">
                            <ForgotPasswordPage />
                        </Route>
                        <Route path="/reset-password">
                            <ResetPasswordPage />
                        </Route>
                        <ProtectedRoute path="/profile">
                            <ProfilePage />
                        </ProtectedRoute>
                        <Route path="/constructor">
                            <BurgerConstructorPage />
                        </Route>
                        <Route path="/ingredient-info">
                            <IngredientInfoPage />
                        </Route>
                        <Route>
                            <NotFound404Page />
                        </Route>
                    </Switch>
                </main>
            </Router>
        </>
    );
}

export default App;
