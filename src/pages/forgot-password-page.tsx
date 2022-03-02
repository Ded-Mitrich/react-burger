import { FunctionComponent, useCallback, useState } from 'react';
import styles from './forgot-password-page.module.css';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { forgotPassword } from '../services/actions';
import { useDispatch } from 'react-redux';

const ForgotPasswordPage: FunctionComponent = () => {

    const [form, setValue] = useState({ email: '' });
    const dispatch = useDispatch();
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const history = useHistory();

    const onFormSubmit = useCallback(
        e => {
            e.preventDefault();
            dispatch(forgotPassword(form));
            history.replace({ pathname: '/reset-password' });
        },
        [form]
    );

    return (
        <div className={styles.root_container}>
            <h1 className="text text_type_main-medium">
                Восстановление пароля
            </h1>
            <form onSubmit={onFormSubmit} className={styles.form}>
            <div className="mt-6" >
                <EmailInput onChange={onChange} value={form.email} name={'email'} />
            </div>
            <div className="mt-6">
                <Button type="primary" size="medium">
                    Восстановить
                </Button>
            </div>
            </form>
            <div className="mt-20 text_type_main-small text_color_inactive">
                Вспомнили пароль?<Link className={"ml-4 " + styles.link} to='/login'>Войти</Link>
            </div>
        </div>
    )

}

export default ForgotPasswordPage