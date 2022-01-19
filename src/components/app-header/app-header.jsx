import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';

function AppHeader() {
    return (
        <header>
            <div className={styles.header_container}>
                <div className={styles.holder_fill}>
                    <div className={styles.holder}>
                        <BurgerIcon />
                        <a href="#" className={"text text_type_main-default " + styles.link}>Конструктор</a>
                    </div>
                    <div className={styles.holder}>
                        <ListIcon />
                        <a href="#" className={"text text_type_main-default " + styles.link}>Лента заказов</a>
                    </div>
                </div>
                <span className={styles.logo}>
                    <Logo />
                </span>
                <div className={styles.holder_fill}>
                    <div className={styles.holder} style={{ minWidth: 290 }}>
                        <ProfileIcon />
                        <a href="#" className={"text text_type_main-default " + styles.link}>Личный кабинет</a>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default AppHeader