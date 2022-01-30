import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverLay from './modal-overlay';
import PropTypes from 'prop-types';

const Modal = ({ onClose, header, children }) => {

    const escFunction = (e) => {
        e.stopPropagation();
        if (e.key === 'Escape') {
            onClose();
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
        return () => {
            document.removeEventListener("keydown", escFunction, false);
        }
    }, [onClose])

    return ReactDOM.createPortal(
        <div className={styles.modal_root}>
            <ModalOverLay onClose={onClose} />
            <div className={styles.modal_confirm}>
                <h2 className={"text text_type_main-large " + styles.modal_header}>
                    {header}
                    <div className={styles.icon_holder}>
                        <CloseIcon onClick={onClose} />
                    </div>
                </h2>
                {children}
            </div>
        </div>,
        document.getElementById("modals"))
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    header: PropTypes.string,
    children: PropTypes.any
};

export default Modal