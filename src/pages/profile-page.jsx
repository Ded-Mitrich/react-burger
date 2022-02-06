import React, { useState } from 'react';
import styles from './profile-page.module.css';
import { EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

const ProfilePage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    return (
        <div className={styles.root_container}>
            <div className={styles.content_container}>
                <div className={styles.links_container}>
                    <h1 className="text text_type_main-medium mt-5">Профиль</h1>
                    <Link to="/orders" className={"text text_type_main-medium mt-10 text_color_inactive " + styles.menu_item}>История заказов</Link>
                    <Link to="/logout" className={"text text_type_main-medium mt-10 text_color_inactive " + styles.menu_item}>Выход</Link>
                    <div className="text text_type_main-small text_color_inactive mt-20">В этом разделе вы можете изменить свои персональные данные</div>
                </div>
                <div className={styles.profile_container}>
                    <div>
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
                </div>
            </div>
        </div>
    )

}

export default ProfilePage