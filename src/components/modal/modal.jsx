import React from 'react';
import ReactDOM from 'react-dom';

class Modal extends React.Component {
    render() {
        const { children, modalRoot } = this.props;
        return ReactDOM.createPortal(
            <div>
                {children}
            </div>
            ,
            modalRoot
        );
    }
}

export default Modal