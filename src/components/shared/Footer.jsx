import React from 'react';

const Footer = () => {
    return (
    <div className='container-fluid mt-3 fixed-bottom'>
        <footer className='bg-dark text-white text-center'>
            <p className='py-2'>&copy; {new Date().getFullYear()} Meeting Calendar. All Rights Reserved.</p>
        </footer>
    </div>
    );
};

export default Footer;