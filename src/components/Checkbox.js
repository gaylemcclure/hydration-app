import React from 'react';

function Checkbox(props) {

  return (
    <>
      <label className="check-label">
        <input type="checkbox" checked={props.checkValue} onChange={props.checkChange}>{props.checkText}</input>
      </label>
    </>
  )
}

export default Checkbox;