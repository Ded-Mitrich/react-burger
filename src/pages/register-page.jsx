import { useCallback, useState } from 'react';
import styles from './register-page.module.css';
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { register } from '../services/actions';
import { useDispatch, useSelector } from 'react-redux';

const RegisterPage = () => {

    const auth = useSelector(store => store.auth);
    const [form, setValue] = useState({ email: '', password: '', name: '' });
    const location = useLocation();
    const dispatch = useDispatch();

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const onFormSubmit = useCallback(
        e => {
            e.preventDefault();
            dispatch(register(form));
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
            <h1 className="text text_type_main-medium">
                Регистрация
            </h1>
            <form onSubmit={onFormSubmit} className={styles.form}>
            <div className="mt-6">
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
            <div className="mt-6">
                <Button type="primary" size="medium">
                    Зарегистрироваться
                </Button>
            </div>
            </form>
            <div className="mt-20 text text_color_inactive text_type_main-small">
                Уже зарегистрированы?<Link className={"ml-4 " + styles.link} to='/login'>Войти</Link>
            </div>
        </div>
    )

}

export default RegisterPage