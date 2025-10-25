import React, { useContext, useEffect, useState } from 'react'
import userContext from '../Contexts/user/userContext'

const Alert = () => {
    const context = useContext(userContext);
    const { alert } = context;
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (alert) {
            setShow(true);
            // Auto-hide after 4 seconds
            const timer = setTimeout(() => {
                setShow(false);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    const getAlertType = (type) => {
        switch (type) {
            case 'success':
                return 'alert-success';
            case 'fail':
            case 'error':
                return 'alert-danger';
            case 'warning':
                return 'alert-warning';
            case 'info':
                return 'alert-info';
            default:
                return 'alert-primary';
        }
    };

    const getAlertIcon = (type) => {
        switch (type) {
            case 'success':
                return 'fa-check-circle';
            case 'fail':
            case 'error':
                return 'fa-exclamation-circle';
            case 'warning':
                return 'fa-exclamation-triangle';
            case 'info':
                return 'fa-info-circle';
            default:
                return 'fa-bell';
        }
    };

    const handleClose = () => {
        setShow(false);
    };

    if (!alert || !show) return null;

    return (
        <div className="position-fixed top-0 start-50 translate-middle-x" style={{ zIndex: 9999, marginTop: '20px' }}>
            <div className={`alert ${getAlertType(alert.type)} alert-dismissible fade show shadow-lg`} role="alert">
                <div className="d-flex align-items-center">
                    <i className={`fa-solid ${getAlertIcon(alert.type)} me-2`}></i>
                    <span className="fw-medium">{alert.msg}</span>
                </div>
                <button
                    type="button"
                    className="btn-close"
                    onClick={handleClose}
                    aria-label="Close"
                ></button>
            </div>
        </div>
    )
}

export default Alert
