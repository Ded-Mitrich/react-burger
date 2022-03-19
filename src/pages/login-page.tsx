import { FunctionComponent, useCallback, useState } from 'react';
import styles from './login-page.module.css';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../services/actions';
import { IRootState } from '../services/reducers';
import { ILocationState } from '../utils/types';

const LoginPage: FunctionComponent = () => {
    const dispatch = useDispatch();
    const auth = useSelector((store: IRootState) => store.auth);
    const [form, setValue] = useState({ email: '', password: '' });
    const location = useLocation<ILocationState>();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const onFormSubmit = useCallback(
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

    return (!auth.loading ?
        <div className={styles.root_container}>
            <h1 className="text text_type_main-medium">
                Вход
            </h1>
            <form onSubmit={onFormSubmit} className={styles.form}>
                <div className="mt-6">
                    <EmailInput onChange={onChange} value={form.email} name={'email'} />
                </div>
                <div className="mt-6">
                    <PasswordInput onChange={onChange} value={form.password} name={'password'} />
                </div>
                <div className="mt-6">
                    <Button type="primary" size="medium">
                        Войти
                    </Button>
                </div>
            </form>
            <div className="mt-20 text text_color_inactive text_type_main-small">
                Вы — новый пользователь?<Link className={"ml-4 " + styles.link} to='/register'>Зарегистрироваться</Link>
            </div>
            <div className="mt-4 text text_color_inactive text_type_main-small">
                Забыли пароль?<Link className={"ml-4 " + styles.link} to='/forgot-password'>Восстановить пароль</Link>
            </div>
        </div>
        : <></>
    )

}

export default LoginPage