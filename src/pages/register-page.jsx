import React, { useState } from 'react';
import styles from './register-page.module.css';
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

const RegisterPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    return (
        <div className={styles.root_container}>
            <h3 className="text text_type_main-small">
                Регистрация
            </h3>
            <div className="mt-6">
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setName(e.target.value)}
                    value={name}
                />
            </div>
            <div className="mt-6">
                <EmailInput onChange={e => setEmail(e.target.value)} value={email} name={'email'} />
            </div>
            <div className="mt-6">
                <PasswordInput onChange={e => setPassword(e.target.value)} value={password} name={'password'} />
            </div>
            <div className="mt-6">
                <Button type="primary" size="medium">
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