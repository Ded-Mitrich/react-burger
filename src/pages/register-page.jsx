import { useCallback, useState } from 'react';
import styles from './register-page.module.css';
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { register } from '../services/actions';
import { useDispatch, useSelector } from 'react-redux';

const RegisterPage = () => {

    const auth = useSelector(store => store.auth);
    const [form, setValue] = useState({ email: '', password: '', name: '' });
    const history = useHistory();
    const dispatch = useDispatch();

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const registerClick = useCallback(
        e => {
            e.preventDefault();
            dispatch(register(form));
            history.replace({ pathname: '/' });
        },
        [auth, form]
    );

    if (auth.user) {
        return (
            <Redirect to={{ pathname: '/' }} />
        );
    }

    return (
        <div className={styles.root_container}>
            <h3 className="text text_type_main-small">
                Регистрация
            </h3>
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
                <Button type="primary" size="medium" onClick={registerClick}>
                    Зарегистрироваться
                </Button>
            </div>
            <div className="mt-20">
                Уже зарегистрированы? <Link className={styles.link} to='/login'>Войти</Link>
            </div>
        </div>
    )

}

export default RegisterPage