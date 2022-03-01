import { useState, useCallback, FunctionComponent } from 'react';
import styles from './reset-password-page.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { resetPassword } from '../services/actions';
import { useDispatch, useSelector } from 'react-redux';
import { ILocationState, Location } from '../utils/types';
import { IRootState } from '../services/reducers';

const ResetPasswordPage : FunctionComponent = () => {
    const auth = useSelector((store: IRootState) => store.auth);
    const location = useLocation<ILocationState>();
    const dispatch = useDispatch();
    const [form, setValue] = useState({ password: '', token: '' });
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const history = useHistory<Location<ILocationState>>();

    const onFormSubmit = useCallback(
        e => {
            e.preventDefault();
            dispatch(resetPassword(form));
            history.replace({ pathname: '/login' });
        },
        [auth, form]
    );

    if (auth.user) {
        return (
            <Redirect to={location?.state?.from || { pathname: '/' }} />
        );
    }

    return (auth.resetPassword ?
        <div className={styles.root_container}>
            <h1 className="text text_type_main-medium">
                Восстановление пароля
            </h1>
            <form onSubmit={onFormSubmit} className={styles.form}>
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
                <Button type="primary" size="medium">
                    Сохранить
                </Button>
            </div>
            </form>
            <div className="mt-20 text_type_main-small text_color_inactive">
                Вспомнили пароль?<Link className={"ml-4 " + styles.link} to='/login'>Войти</Link>
            </div>
        </div> : <></>
    )

}

export default ResetPasswordPage