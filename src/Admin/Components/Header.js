import React from 'react';
import BackButton from './BackButton'; 

const Header = ({ title, icon: Icon}) => {
  return (
    <div className="container p-0">
      <div className="mb-3 d-flex align-items-center py-3 header-container bg-success">
        <BackButton className="backbtn fs-4 ms-2" />
        <h2 className="fs-4 text-white m-0 d-flex align-items-center justify-content-center flex-grow-1">
          {Icon && <Icon className="me-2" />} {title}
        </h2>
      </div>
    </div>
  );
};

export default Header;