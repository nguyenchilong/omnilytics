
import React, { useState, useEffect } from 'react';
import { Toast } from 'react-bootstrap';
import '../assets/css/main.css';

function ToastAlert(props) {
    const { title, message } = props;
    const [show, setShow] = useState(props.show);
/*
    const interval = setInterval(() => {
        if (autoDelete && toastList.length && list.length) {
            deleteToast(toastList[0].id);
        }
    }, dismissTime);
    
    return () => {
        clearInterval(interval);
    }
*/
    useEffect(() => {
        const interval = setInterval(() => {
            setShow(props.show);
        }, 500);

        return () => {
            clearInterval(interval);
        }
    }, [ title, message ]);

    return (
        <div aria-live="polite" aria-atomic="true" className="toast-container">
            <div className="toast-placement">
                <Toast onClose={() => setShow(false)} show={show} delay={5000} autohide>
                    <Toast.Header>
                        <strong className="mr-auto">{title}</strong>
                    </Toast.Header>
                    <Toast.Body>{message}</Toast.Body>
                </Toast>
            </div>
        </div>
    );
}

export default ToastAlert;
