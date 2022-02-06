import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';
import { Link } from 'react-router-dom';

function AppHeader() {
    return (
        <header>
            <div className={styles.header_container}>
                <div className={styles.holder_fill}>
                    <div className={styles.holder}>
                        <BurgerIcon />
                        <Link to="/constructor" className={"text text_type_main-default " + styles.link}>Конструктор</Link>
                    </div>
                    <div className={styles.holder}>
                        <ListIcon />
                        <Link to="/ingredient-info" className={"text text_type_main-default " + styles.link}>Лента заказов</Link>
                    </div>
                </div>
                <span className={styles.logo}>
                    <Logo />
                </span>
                <div className={styles.holder_fill}>
                    <div className={styles.holder} style={{ minWidth: 290 }}>
                        <ProfileIcon />
                        <Link to="/profile" className={"text text_type_main-default " + styles.link}>Личный кабинет</Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default AppHeader