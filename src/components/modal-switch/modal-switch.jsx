import styles from './modal-switch.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructorPage from '../../pages/burger-constructor-page';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import LoginPage from '../../pages/login-page';
import RegisterPage from '../../pages/register-page';
import ForgotPasswordPage from '../../pages/forgot-password-page';
import ResetPasswordPage from '../../pages/reset-password-page';
import ProfilePage from '../../pages/profile-page';
import NotFound404Page from '../../pages/not-found-page';
import IngredientInfoPage from '../../pages/ingredient-info-page';
import { ProtectedRoute } from '../protected-route/protected-route';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

export const ModalSwitch = () => {
    const location = useLocation();
    const history = useHistory();
    const background = location.state && location.state.background;

    const handleModalClose = () => {
        history.goBack();
    };

    return (
        <>
            <AppHeader />
            <main className={styles.main}>
                <Switch location={background || location}>
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
                    <Route path='/ingredients/:ingredientId' exact>
                        <IngredientInfoPage />
                    </Route>
                    <Route path="/" exact>
                        <BurgerConstructorPage />
                    </Route>
                    <Route>
                        <NotFound404Page />
                    </Route>
                </Switch>
                {background && (
                    <Route
                        path='/ingredients/:ingredientId'
                        children={
                            <Modal onClose={handleModalClose}>
                                <IngredientDetails />
                            </Modal>
                        }
                    />
                )}
            </main>
        </>
    );
}