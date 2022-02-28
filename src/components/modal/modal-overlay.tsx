import { FunctionComponent } from 'react';
import styles from './modal.module.css';
import * as React from 'react';

const ModalOverLay: FunctionComponent<{ onClose: () => void}> = ({ onClose }) => {
    return (<div className={styles.modal_overlay} onClick={onClose} />)
}

export default ModalOverLay