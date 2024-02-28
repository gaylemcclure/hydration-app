import { React, useState, useEffect } from "react";

function TimerPage() {

  const [counter, setCounter] = useState(60);
  const [minutes, setMinutes] = useState(29);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if(counter === 0) {
      setMinutes(minutes-1)
      setCounter(59)
    }
    if (minutes === 0) {
      setMinutes(30)
    }

  }, [counter]);

  return (
    <div className="timer">
    {counter < 10 ? <div>Countdown: {minutes}:0{counter}</div> : <div>Countdown: {minutes}:{counter}</div>} 
    </div>
  );
}

  

//Get minutes from the countdown state
//set seconds to 00
//count seconds from 00 > 59 and down to 00 again
//Each time the seconds hit 00, count a minute down
//Split the times into separate digits to put into a countdown


//   return (
//     <>
//       <h1>{timer.resetMinutes}:{secs}</h1>
//       <h2>{countdown}</h2>
//       <div className="timer box-1">0</div>
//       <div className="timer box-2">0</div>
//       <div className="timer box-3">0</div>
//       <div className="timer box-4">0</div>
//     </>
    
//   )
// }

export default TimerPage;