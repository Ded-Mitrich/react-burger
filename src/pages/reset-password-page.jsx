import React, { useState } from 'react';
import styles from './reset-password-page.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

const ResetPasswordPage = () => {

    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')

    return (
        <div className={styles.root_container}>
            <h3 className="text text_type_main-small">
                Восстановление пароля
            </h3>
            <div className="mt-6">
                <PasswordInput
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name={'password'} />
            </div>
            <div className="mt-6">
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => setCode(e.target.value)}
                    value={code}
                />
            </div>
            <div className="mt-6">
                <Button type="primary" size="medium">
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