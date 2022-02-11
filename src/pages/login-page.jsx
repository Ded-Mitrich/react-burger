import { useCallback, useState } from 'react';
import styles from './login-page.module.css';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../services/actions';

const LoginPage = () => {
    const dispatch = useDispatch();
    const auth = useSelector(store => store.auth);
    const [form, setValue] = useState({ email: '', password: '' });
    const location = useLocation();

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const onLoginClick = useCallback(
        e => {
            e.preventDefault();
            dispatch(login(form));
        },
        [auth, form]
    );

    if (auth.user) {
        return (
            <Redirect to={location?.state?.from || { pathname: '/' }} />
        );
    }

    return (
        <div className={styles.root_container}>
            <h3 className="text text_type_main-small">
                Вход
            </h3>
            <div className="mt-6">
                <EmailInput onChange={onChange} value={form.email} name={'email'} />
            </div>
            <div className="mt-6">
                <PasswordInput onChange={onChange} value={form.password} name={'password'} />
            </div>
            <div className="mt-6">
                <Button type="primary" size="medium" onClick={onLoginClick}>
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