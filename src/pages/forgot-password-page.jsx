import React, { useCallback, useState } from 'react';
import styles from './forgot-password.module.css';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { forgotPassword } from '../services/actions';
import { useDispatch } from 'react-redux';

const ForgotPasswordPage = () => {

    const [form, setValue] = useState({ email: ''});
    const dispatch = useDispatch();
    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const history = useHistory();

    const onClick = useCallback(
        e => {
            e.preventDefault();
            dispatch(forgotPassword(form));
            history.replace({ pathname: '/reset-password' });
        },
        [form]
    );

    return (
        <div className={styles.root_container}>
            <h3 className="text text_type_main-small">
                Восстановление пароля
            </h3>
            <div className="mt-6">
                <EmailInput onChange={onChange} value={form.email} name={'email'}/>
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