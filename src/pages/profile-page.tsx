import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import styles from './profile-page.module.css';
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation } from 'react-router-dom';
import { ILocationState } from '../utils/types';
import { OrderFeed } from '../components/order-feed/order-feed';
import { logout, updateUser } from '../services/actions/user-actions';
import { clearWsData, closeWsOrders, openWsOrders } from '../services/actions/action-creators';
import { authTokenCookieName, getCookie, refreshTokens, wsBaseUrl } from '../utils/utils';
import { useAppDispatch, useAppSelector } from '../services/store';

const ProfilePage: FunctionComponent = () => {
    const appDispatch = useAppDispatch();
    const auth = useAppSelector(store => store.auth);
    const [form, setValue] = useState({ email: '', password: '', name: '' });
    const location = useLocation<ILocationState>();
    const [isChanged, setIsChanged] = useState(false);
    const orders = useAppSelector(store => store.ws.orders);

    const setValues = () => {
        setValue({ email: auth.user?.email ?? '', password: '', name: auth.user?.name ?? '' });
    }

    useEffect(() => {
        setValues();
        let authToken = getCookie(authTokenCookieName);
        if (authToken) {
            appDispatch(openWsOrders(`${wsBaseUrl}?token=${authToken}`));
        }
        else {
            refreshTokens();
            authToken = getCookie(authTokenCookieName);
            if (authToken) {
                appDispatch(openWsOrders(`${wsBaseUrl}?token=${authToken}`));
            }
        }
        return () => {
            appDispatch(closeWsOrders());
            appDispatch(clearWsData());
        };
    }, []);

    useEffect(() => {
        setIsChanged(form.email !== auth.user?.email ||
            form.name !== auth.user?.name ||
            form.password !== '');
    }, [auth, form]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const logoutHandle = useCallback(
        e => {
            e.preventDefault();
            appDispatch(logout());
        },
        []
    );

    const onFormSubmit = useCallback(
        e => {
            e.preventDefault();
            appDispatch(updateUser(form));
        },
        [auth, form]
    );

    const onCancelClick = useCallback(
        e => {
            e.preventDefault();
            setValues();
        },
        [auth, form]
    );

    const getDescription = (): string => {
        return location.pathname === '/profile' ?
            'В этом разделе вы можете изменить свои персональные данные'
            :
            location.pathname === '/profile/orders' ?
                'В этом разделе вы можете просмотреть свою историю заказов'
                : ''
    }

    return (
        <div className={styles.root_container}>
            <div className={styles.content_container}>
                <div className={styles.links_container}>
                    <NavLink to="/profile"
                        exact
                        activeStyle={{ color: 'white' }}
                        className={"text text_type_main-medium mt-5 text_color_inactive " + styles.menu_item}>Профиль</NavLink>
                    <NavLink to="/profile/orders"
                        exact
                        activeStyle={{ color: 'white' }}
                        className={"text text_type_main-medium mt-10 text_color_inactive " + styles.menu_item}>История заказов</NavLink>
                    <NavLink to="/logout" onClick={logoutHandle}
                        exact
                        activeStyle={{ color: 'white' }}
                        className={"text text_type_main-medium mt-10 text_color_inactive " + styles.menu_item}>Выход</NavLink>
                    <div className="text text_type_main-small text_color_inactive mt-20">{getDescription()}</div>
                </div>
            </div>

            {location.pathname === '/profile' && <form onSubmit={onFormSubmit}>
                <div className={styles.profile_container}>
                    <div>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={onChange}
                            value={form.name}
                            name='name'
                        />
                    </div>
                    <div className="mt-6">
                        <EmailInput onChange={onChange} value={form.email} name={'email'} />
                    </div>
                    <div className="mt-6">
                        <PasswordInput onChange={onChange} value={form.password} name={'password'} />
                    </div>
                    {isChanged && <div className={"mt-6 " + styles.buttons}>
                        <Button type="secondary" htmlType="button" size="medium" onClick={onCancelClick}>
                            Отменить
                        </Button>
                        <Button type="primary" size="medium">
                            Сохранить
                        </Button>
                    </div>}
                </div>
            </form>}
            {location.pathname.startsWith('/profile/orders') &&
                <div className={"ml-15 mt-10 " + styles.order_feed}>
                    <OrderFeed orders={orders} showStatus />
                </div>
            }
        </div >
    )

}

export default ProfilePage