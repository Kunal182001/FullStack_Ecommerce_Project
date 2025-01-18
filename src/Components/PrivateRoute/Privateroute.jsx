import React from 'react';
import { Navigate } from 'react-router-dom';

const Privateroute = ({ children }) => {
    const hasAccess = localStorage.getItem('hasAdminAccess') === 'true';
  
    return hasAccess ? children : <Navigate to="/access" replace />;
};

export default Privateroute;
