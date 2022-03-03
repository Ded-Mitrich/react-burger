import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import { FunctionComponent } from 'react';
import { ILocationState } from '../../utils/types';

export const AppHeader: FunctionComponent = () => {

    const location = useLocation<ILocationState>();

    return (
        <header>
            <div className={styles.header_container}>
                <div className={styles.holder_fill}>
                    <div className={styles.holder}>
                        <BurgerIcon type={location.pathname === "/" ? "primary" : "secondary"} />
                        <NavLink
                            to="/"
                            className={"text text_type_main-default text_color_inactive " + styles.link}
                            activeStyle={{ color: 'white' }}
                            exact
                        >Конструктор</NavLink>
                    </div>
                    <div className={styles.holder}>
                        <ListIcon type={location.pathname === "/orders" ? "primary" : "secondary"} />
                        <NavLink
                            to="/orders"
                            className={"text text_type_main-default text_color_inactive " + styles.link}
                            activeStyle={{ color: 'white' }}
                            exact
                        >Лента заказов</NavLink>
                    </div>
                </div>
                <span className={styles.logo}>
                    <NavLink to="/" exact>
                        <Logo />
                    </NavLink>
                </span>
                <div className={styles.holder_fill}>
                    <div className={styles.holder} style={{ minWidth: 290 }}>
                        <ProfileIcon type={location.pathname.startsWith("/profile") ? "primary" : "secondary"} />
                        <NavLink
                            to="/profile"
                            className={"text text_type_main-default text_color_inactive " + styles.link}
                            activeStyle={{ color: 'white' }}
                        >Личный кабинет</NavLink>
                    </div>
                </div>
            </div>
        </header>
    );
}