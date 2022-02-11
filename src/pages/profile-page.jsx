import { useCallback, useEffect, useState } from 'react';
import styles from './profile-page.module.css';
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateUser } from '../services/actions';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const auth = useSelector(store => store.auth);
    const [form, setValue] = useState({ email: '', password: '', name: '' });

    const setValues = () => {
        setValue({ email: auth.user.email, password: '', name: auth.user.name });
    }

    useEffect(() => {
        setValues();
    }, []);

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const logoutHandle = useCallback(
        e => {
            e.preventDefault();
            dispatch(logout());
        },
        []
    );

    const onConfirmClick = useCallback(
        e => {
            e.preventDefault();
            dispatch(updateUser(form));
        },
        [form]
    );

    const onCancelClick = useCallback(
        e => {
            e.preventDefault();
            setValues();
        },
        []
    );

    return (
        <div className={styles.root_container}>
            <div className={styles.content_container}>
                <div className={styles.links_container}>
                    <Link to="#" className="text text_type_main-medium mt-5">Профиль</Link>
                    <Link to="/orders" className={"text text_type_main-medium mt-10 text_color_inactive " + styles.menu_item}>История заказов</Link>
                    <Link to="/logout" onClick={logoutHandle} className={"text text_type_main-medium mt-10 text_color_inactive " + styles.menu_item}>Выход</Link>
                    <div className="text text_type_main-small text_color_inactive mt-20">В этом разделе вы можете изменить свои персональные данные</div>
                </div>
                <div className={styles.profile_container}>
                    <div>
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
                        <Button type="secondary" size="medium" onClick={onCancelClick}>
                            Отменить
                        </Button>
                        <Button type="primary" size="medium" onClick={onConfirmClick}>
                            Сохранить
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ProfilePage