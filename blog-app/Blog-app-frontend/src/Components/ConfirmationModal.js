import React from 'react';

const ConfirmationModal = ({ show, onConfirm, onCancel, title, message, confirmText = "Yes, Delete", cancelText = "Cancel", type = "danger" }) => {
    if (!show) return null;

    return (
        <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                <i className={`fa-solid ${type === 'danger' ? 'fa-exclamation-triangle text-danger' : 'fa-question-circle text-warning'} me-2`}></i>
                                {title}
                            </h5>
                            <button type="button" className="btn-close" onClick={onCancel} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p className="mb-0">{message}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onCancel}>
                                {cancelText}
                            </button>
                            <button type="button" className={`btn btn-${type}`} onClick={onConfirm}>
                                {confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmationModal;
