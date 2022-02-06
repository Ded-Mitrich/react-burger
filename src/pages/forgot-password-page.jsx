import React, { useState } from 'react';
import styles from './forgot-password.module.css';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';

const ForgotPasswordPage = () => {

    const [email, setEmail] = useState('')
    const history = useHistory();

    const onClick = () => {
        history.replace({ pathname: '/reset-password'});
    };

    return (
        <div className={styles.root_container}>
            <h3 className="text text_type_main-small">
                Восстановление пароля
            </h3>
            <div className="mt-6">
                <EmailInput onChange={(e) => setEmail(e.target.value)} value={email} name={'email'}/>
            </div>
            <div className="mt-6">
                <Button onClick={onClick} type="primary" size="medium">
                    Восстановить
                </Button>
            </div>
            <div className="mt-20">
                Вспомнили пароль? <Link className={styles.link} to='/login'>Войти</Link>
            </div>
        </div>
    )

}

export default ForgotPasswordPage