import React from 'react';
import styles from './modal.module.css';

const ModalOverLay = React.forwardRef((props, ref) => {

    React.useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
        return () => {
            document.removeEventListener("keydown", escFunction, false);
        }
    }, []);

    const escFunction = (e) => {
        if (e.keyCode === 27) {
            props.onClose();
        }
    }

    return (<div ref={ref} className={styles.modal_overlay} onClick={props.onClose} onKeyDown={escFunction} />)
})

export default ModalOverLay