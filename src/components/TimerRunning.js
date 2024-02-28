import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullseye, faTrophy } from '@fortawesome/free-solid-svg-icons'

function TimerRunning(props) {

  return (
    <>
    <div className="goal">
      <div className="icon"><FontAwesomeIcon icon={faBullseye} /> </div>
      <h2 className="sub-heading">Your Goal</h2>
      <p className="test-text">
        To drink <span className="drink-amount">{props.waterAmount}</span> litres in <span className="drink-amount">{props.difference}</span> hours.</p>
      <div className="icon"><FontAwesomeIcon icon={faTrophy} /></div>
      <h2 className="sub-heading">How to achieve</h2>
      <p className="test-text">Drink <span className="drink-amount">{props.drinkAmount}</span>  mls every time the countdown reaches 0.
        <br />Press the "I've drank water" button to reset the time<br />
      </p>
    </div>)
    </>
  )
}

export default TimerRunning;