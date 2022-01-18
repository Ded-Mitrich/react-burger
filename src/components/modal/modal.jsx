import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';

const Modal = ({ children, header, onClose }) => {
    return (
        <div className={styles.modal_confirm}>
            <div className={"text text_type_main-large " + styles.modal_header}>
                {header}
                <div className={styles.icon_holder}>
                    <CloseIcon onClick={onClose} />
                </div>
            </div>
            {children}
        </div>
    )
}

export default Modal