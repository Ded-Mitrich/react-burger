import React from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverLay from './modal-overlay';
import PropTypes from 'prop-types';

class Modal extends React.Component {
    render() {
        const { modalRoot, onClose, header, children } = this.props;
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
            </div>
            , modalRoot.current)
    }
}

Modal.propTypes = {
    modalRoot: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    header: PropTypes.string,
    children: PropTypes.any
};

export default Modal