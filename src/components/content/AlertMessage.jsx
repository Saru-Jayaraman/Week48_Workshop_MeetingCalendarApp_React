import React from 'react';

const AlertMessage = (props) => {
    return (
    <div>
        <div className={`alert alert-${props.color} alert-dismissible fade show text-center py-1 fs-5`} style={{height: "40px"}} role="alert">
            {props.icon && <span className='me-2'>{props.icon}</span>} {props.message}
            <button type="button" className="btn-close py-2" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>
    );
};

export default AlertMessage;