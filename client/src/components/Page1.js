import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const Page1 = () => {
  // Render the login form here
  const location = useLocation()
  return (
    <div>
      <h1>Hello {location.state.id}, Welcome to Jurnal.</h1>
      
    </div>  
  );
};

export default Page1;