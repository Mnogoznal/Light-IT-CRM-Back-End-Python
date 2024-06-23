import React from 'react';

const CurrentYear = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div>
     <p>CRM System | Tech </p>
     <p> Copyright &copy; {currentYear} Oleksander Petrenko | All Rights Reserved | Light IT</p>
    </div>
  );
};

export default CurrentYear;
