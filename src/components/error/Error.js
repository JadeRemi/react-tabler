import React from 'react';

const Error = ({ error }) => {
  return (
    <div className="interactions">
      <p>Что-то пошло не так.</p>
      <p>{error.message}</p>
    </div>
  );
};

export default Error;
