import React from 'react';

function ErrorMessage(props) {
  return (
    <>
      <p className="errorMessage">Please select {props.error}</p>
    </>
  )
}

export default ErrorMessage;