import React from 'react';

function CountdownTimer(props) {

  return (
    <div className="timer">
      <div className="timer-inner">
        <div className="min1 time">{props.min1}</div>
        <div className="min2 time">{props.min2}</div>
        <span className="colon time">:</span>
        <div className="sec1 time">{props.sec1}</div>
        <div className="sec2 time">{props.sec2}</div>
    </div>
  </div>
  )
}

export default CountdownTimer;