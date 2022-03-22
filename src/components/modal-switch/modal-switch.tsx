import styles from './modal-switch.module.css';
import { AppHeader } from '../app-header/app-header';
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
import { FunctionComponent } from 'react';
import { ILocationState } from '../../utils/types';
import OrdersFeedPage from '../../pages/orders-feed-page';
import { OrderView } from '../order-view/order-view';
import OrderInfoPage from '../../pages/order-info-page';
import loadingImg from '../../images/loading.gif';
import { useAppSelector } from '../../services/store';


export const ModalSwitch: FunctionComponent = () => {
    const location = useLocation<ILocationState>();
    const history = useHistory();
    const background = location.state && location.state.background;
    const { requestSent } = useAppSelector(store => store.orders);

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
                    <Route path="/feed/:id">
                        <OrderInfoPage />
                    </Route>
                    <Route path="/feed">
                        <OrdersFeedPage />
                    </Route>
                    <ProtectedRoute path="/profile/orders/:id">
                        <OrderInfoPage />
                    </ProtectedRoute>
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
                    <>
                        <Route
                            path='/ingredients/:ingredientId'
                            children={
                                <Modal onClose={handleModalClose}>
                                    <IngredientDetails />
                                </Modal>
                            }
                        />
                        <Route
                            path='/feed/:id'
                            children={
                                <Modal onClose={handleModalClose}>
                                    <OrderView />
                                </Modal>
                            }
                        />
                        <ProtectedRoute path="/profile/orders/:id"
                            children={
                                <Modal onClose={handleModalClose}>
                                    <OrderView />
                                </Modal>
                            }
                        />
                    </>
                )}
            </main>
            {requestSent && <div className={styles.loading_overlay}>
                <img style={{ width: 100, height: 100 }} src={loadingImg} />
            </div>}
        </>
    );
}