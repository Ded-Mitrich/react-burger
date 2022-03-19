import { FunctionComponent, useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverLay from './modal-overlay';
import * as ReactDOM from 'react-dom';

const Modal: FunctionComponent<{ onClose: () => void, header?: string }> = ({ onClose, header, children }) => {

    const escFunction = (e: KeyboardEvent) => {
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

    const rootModal = document.getElementById("modals");

    return rootModal && ReactDOM.createPortal(
        <div className={styles.modal_root}>
            <ModalOverLay onClose={onClose} />
            <div className={styles.modal_confirm}>
                <h2 className={"text text_type_main-large " + styles.modal_header}>
                    {header}
                    <div className={styles.icon_holder}>
                        <CloseIcon onClick={onClose} type={'primary'} />
                    </div>
                </h2>
                {children}
            </div>
        </div>,
        rootModal)
}

export default Modal