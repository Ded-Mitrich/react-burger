import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';

class ModalOverLay extends React.Component {
    constructor(props) {
        super(props);
        this.escFunction = this.escFunction.bind(this);
    }

    escFunction(event) {
        if (event.keyCode === 27) {
            this.props.onClose();
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.escFunction, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }

    render() {
        const { children, modalRoot, onClose } = this.props;
        return ReactDOM.createPortal(
            <div className={styles.modal_overlay} onClick={onClose} onKeyDown={this.escFunction}>
                {children}
            </div>
            , modalRoot
        );
    }
}

export default ModalOverLay