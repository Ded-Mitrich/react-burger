import React from 'react';
import styles from './modal.module.css';
import PropTypes from 'prop-types';

const ModalOverLay = ({ onClose }) => {
    return (<div className={styles.modal_overlay} onClick={onClose} />)
}

ModalOverLay.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default ModalOverLay