import React, { useState } from 'react';
import styles from './login-page.module.css';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

const LoginPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className={styles.root_container}>
            <h3 className="text text_type_main-small">
                Вход
            </h3>
            <div className="mt-6">
                <EmailInput onChange={e => setEmail(e.target.value)} value={email} name={'email'} />
            </div>
            <div className="mt-6">
                <PasswordInput onChange={e => setPassword(e.target.value)} value={password} name={'password'} />
            </div>
            <div className="mt-6">
                <Button type="primary" size="medium">
                    Войти
                </Button>
            </div>
            <div className="mt-20">
                Вы — новый пользователь? <Link className={styles.link} to='/register'>Зарегистрироваться</Link>
            </div>
            <div className="mt-4">
                Забыли пароль? <Link className={styles.link} to='/forgot-password'>Восстановить пароль</Link>
            </div>
        </div>
    )

}

export default LoginPage