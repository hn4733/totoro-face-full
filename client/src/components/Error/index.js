import React from 'react';

const ErrorMessage = ({ error }) => (
  <div>
    <p>{error.message.replace('GraphQL error: ', '')}</p>
  </div>
);

export default ErrorMessage;
