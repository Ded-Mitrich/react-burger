import React from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverLay from './modal-overlay';
import PropTypes from 'prop-types';

class Modal extends React.Component {

    escFunction = (e) => {
        e.stopPropagation();
        if (e.keyCode === 27) {
            this.props.onClose();
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.escFunction, false);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate");
        if (this.props.onClose !== prevProps.onClose) {
            console.log("componentDidUpdate onClose changed");
            document.removeEventListener("keydown", this.escFunction, false);
            document.addEventListener("keydown", this.escFunction, false);
        }
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }

    render() {
        const { onClose, header, children } = this.props;
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
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    header: PropTypes.string,
    children: PropTypes.any
};

export default Modal