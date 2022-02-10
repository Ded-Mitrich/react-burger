import React, { useState, useCallback} from 'react';
import styles from './reset-password-page.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { resetPassword } from '../services/actions';
import { useDispatch, useSelector } from 'react-redux';

const ResetPasswordPage = () => {
    const auth = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const [form, setValue] = useState({ password: '', token: '' });
    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const history = useHistory();

    const onClick = useCallback(
        e => {
            e.preventDefault();
            dispatch(resetPassword(form));
            history.replace({ pathname: '/login' });
        },
        [auth, form]
    );

    if (auth.user) {
        return (
            <Redirect to={{ pathname: '/' }} />
        );
    }

    if (!auth.resetPassword) {
        return (
            <Redirect to={{ pathname: '/forgot-password' }} />
        );
    }

    return (
        <div className={styles.root_container}>
            <h3 className="text text_type_main-small">
                Восстановление пароля
            </h3>
            <div className="mt-6">
                <PasswordInput
                    onChange={onChange}
                    value={form.password}
                    name='password' />
            </div>
            <div className="mt-6">
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={onChange}
                    name='token'
                    value={form.token}
                />
            </div>
            <div className="mt-6">
                <Button type="primary" size="medium" onClick={onClick}>
                    Сохранить
                </Button>
            </div>
            <div className="mt-20">
                Вспомнили пароль? <Link className={styles.link} to='/login'>Войти</Link>
            </div>
        </div>
    )

}

export default ResetPasswordPage