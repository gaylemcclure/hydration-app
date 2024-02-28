import { React, useState, useEffect } from 'react';
import { Link } from "react-router-dom"
//import WaterGlass from '../components/WaterGlass';
import TimerRunning from '../components/TimerRunning';
import TimerFinished from '../components/TimerFinished';
import CountdownTimer from '../components/CountdownTimer';

function WaterPage() {

  const [time, setTime] = useState([]);
  const [reset, setReset] = useState(false);
  const [clickCount, setClickCount] = useState(0)
  const [seconds, setSeconds] = useState({
    sec1: 5,
    sec2: 9,
    secTotal: 60,
    zero: 0
  });
  const [minutes, setMinutes] = useState({
    min1: '',
    min2: '',
    minTotal: 0,
    zero: 0
  });

  //Time now to stop the countdown at the selected hour
  let today = new Date();
  let currentHour = today.getHours();

  //Get question page info from local storage. 
  useEffect(() => {
    const time = JSON.parse(localStorage.getItem('time'));
    if (time) {
      setTime(time)
    }
    setMinutes(minutes => ({
      ...minutes,
      minTotal: time.remindAmount
    }))
  }, []);

  //Initially sets the single minutes
  useEffect(() => {
    if (time.length !== 0) {
      let min = time.remindAmount - 1
      let newMin = min.toString().split('')
      let minSplit = newMin.map(Number)
      setMinutes(minutes => ({
        ...minutes,
        minTotal: minutes.minTotal - 1,
        min1: minSplit[0],
        min2: minSplit[1]
      }))
  }
  }, [time])


  //timer countdown.
  useEffect(() => {
    //Splits the seconds to individual seconds
    let sec = seconds.secTotal - 1
    let newSec = sec.toString().split('')
    let secSplit = newSec.map(Number)
    if (secSplit.length === 1) {
      secSplit.unshift(0)
    }
    //Splits the minutes to individual digits
    let min = minutes.minTotal - 1
    let newMin = min.toString().split('')
    let minSplit = newMin.map(Number)
    if (minSplit.length === 1) {
      secSplit.unshift(0)
    }
    //Greater than 0 - countdown keeps going
    if (seconds.secTotal > 0) {
      const timer = () => setTimeout(() => setSeconds(seconds => ({...seconds, secTotal: seconds.secTotal - 1, sec1: secSplit[0], sec2: secSplit[1]})), 1000);
      const timerId = timer()
      if (reset === true) {
        clearTimeout(timerId)
        setReset(false)
        setMinutes(minutes => ({
          ...minutes,
          minTotal: time.remindAmount - 1
        }))
        setSeconds(seconds => ({
          ...seconds,
          secTotal: 60
        }))
      }
    }
    //Seconds = 0 will reduce minutes by 1 and reset seconds to 59
    if(seconds.secTotal === 0 && reset === false) {
      setMinutes(minutes => ({
        ...minutes,
        minTotal: minutes.minTotal - 1,
        min1: minSplit[0],
        min2: minSplit[1]
      }))
      setSeconds(seconds => ({
        ...seconds,
        secTotal: 59
      }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  
  //Figure out how much water to drink each time
  let difference = time.endValue - time.startValue;
  let remind;
  switch (time.remindValue) {
    case 1:
      remind = 0.5;
      break;
    case 2: 
      remind = 0.75;
      break;
    case 3: 
      remind = 1;
      break;
    default:
      remind = 1.5;
  }
  let remindAmountofTimes = Math.floor(difference / remind);
  let drinkAmount = Math.round((time.waterAmount * 1000) / remindAmountofTimes);
  let totalDrank = drinkAmount * clickCount;

  const handleReset = () => {
    setReset(true)
    setClickCount(prevClick => {
      return ( prevClick + 1 )
    })
  }


  return (
    <div className="App">
      <h1 className="drink-heading">Drink up!</h1>
      {currentHour >= time.endValue ? null : <CountdownTimer min1={minutes.min1} min2={minutes.min2} sec1={seconds.sec1} sec2={seconds.sec2} />}
      {currentHour >= time.endValue ? <TimerFinished waterAmount={time.waterAmount} totalDrank={totalDrank} difference={difference} /> : <TimerRunning waterAmount={time.waterAmount} difference={difference} drinkAmount={drinkAmount} /> }
      {currentHour >= time.endValue ? null : <button className="drink-button" onClick={handleReset}>I drank water! </button> }
      <Link to="/"><button className="reset-button">Start again</button></Link>
      {currentHour >= time.endValue ? <p>Stop drinking water! You can reset again tomorrow</p> : <p>Keep drinking!!</p>}
    </div>
  )
}

export default WaterPage;

 
//Also - an alarm that goes off when the times reaches 0
//Fix the css of the countdown - add in a page flip
//Sort out what happens when the timer reaches 0 with the water glass animation



