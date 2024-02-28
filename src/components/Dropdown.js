import React from 'react';

function Dropdown(props) {



  return (
    <div className="dropdown">
    <label>{props.label}
      <select className={props.selectClass} time={props.name} value={props.value} onChange={props.change}>
        {props.options}
      </select>
      </label>
    </div>
  )
}

export default Dropdown;


