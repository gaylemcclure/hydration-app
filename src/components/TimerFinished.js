import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullseye, faTrophy } from '@fortawesome/free-solid-svg-icons'

function TimerFinished(props) {
  let result;

  if (props.waterAmount * 1000 > props.totalDrank) {
     result = false
  }

  return (
    <div className="goal">
      <div className="icon"><FontAwesomeIcon icon={faBullseye} /> </div>
      <h2 className="sub-heading">Your Goal</h2>
      <p className="test-text">
        To drink <span className="drink-amount">{props.waterAmount}</span> litres in <span className="drink-amount">{props.difference}</span> hours.</p>
      <div className="icon"><FontAwesomeIcon icon={faTrophy} /></div>
      <h2 className="sub-heading">Your achievement today</h2>
      <p className="test-text">You drank <span className="drink-amount">{props.totalDrank}</span> litres in {props.difference} hours. {result ? <p className="test-text">Congratulations, you reached your goal!</p> : <p className="test-text">You didn't quite drink enough today, lets try again tomorrow</p>}
      </p>
    </div>
  )
}

export default TimerFinished;