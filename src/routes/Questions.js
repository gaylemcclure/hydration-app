import { React, useState, useEffect } from 'react';
import Dropdown from '../components/Dropdown';
import Slider from '../components/Slider';
import { startTimes, endTimes, remindTimes } from '../times';
import { Link } from "react-router-dom";
import "../styles/questions.css";
import ErrorMessage from '../components/ErrorMessage';

function Questions(props) {

  const [sliderValue, setSliderValue] = useState(0);
  const [buttonValidate, setButtonValidate] = useState(false);
  const [errors, setErrors] = useState({
    startError: {
      valid:false,
      visible: false
    },
    endError: {
      valid:false,
      visible: false
    },
    waterError: {
      valid:false,
      visible: false
    },
    remindError: {
      valid:false,
      visible: false
    },
  })
  const [time, setTime] = useState([{
    id: "",
    start: "",
    end: "",
    startValue: 999,
    endValue: 998,
    remindTime: "30 minutes",
    remindValue: 997,
    remindAmount: 30,
    total: 0,
    timesVisible: false,
    amountVisible: false,
    waterAmount: 0,
    drinkAmount: 0
  }]);


  useEffect(() => {
  localStorage.setItem('time', JSON.stringify(time));
  }, [time]);

  const makeStartTimes = startTimes.map(startTime => {
    return (
      <option 
        key={startTime.id} 
        name={startTime.time} 
        value={startTime.value} >
        {startTime.time}
      </option>
    )
  });

  const makeEndTimes = endTimes.map(endTime => {
    return (
      <option 
        key={endTime.id} 
        name={endTime.time} 
        value={endTime.value}
        >{endTime.time}
      </option>
    )
  });

  const makeRemindTimes = remindTimes.map(remindTime => {
    return (
      <option 
        key={remindTime.id} 
        name={remindTime.time} 
        value={remindTime.value}
        timer={remindTime.timer}
        >{remindTime.time}
      </option>
    )
  })

  function handleStartSelect(event) {
    setTime(time => ({
      ...time,
      start: event.target[event.target.selectedIndex].label,
      startValue: Number(event.target.value),
      total: time.endValue - Number(event.target.value),
      remindValue: 1,
      remindAmount: 30
    }));
    setErrors(errors => {
      return {
      ...errors,
      startError: {
        ...errors.startError,
        valid: true
      }}
    });
  }

  function handleEndSelect(event) {
    setTime(time => ({
      ...time,
      end: event.target[event.target.selectedIndex].label,
      endValue: Number(event.target.value),
      total: Number(event.target.value) - time.startValue,
      timesVisible: true
    }));
    setErrors(errors => {
      return {
      ...errors,
      endError: {
        ...errors.endError,
        valid: true
      }}
    });
  }

  function handleSlider(event) {
    setSliderValue(event.target.value)
    setTime(time => ({
      ...time, 
      waterAmount: event.target.value
    }));
    setErrors(errors => {
      return {
      ...errors,
      waterError: {
        ...errors.waterError,
        valid: true
      }}
    });
  }

  function handleRemindSelect(event) {
    setTime(time => ({
      ...time,
      remindTime: event.target[event.target.selectedIndex].label,
      remindValue: event.target.value,
      amountVisible: true,
      remindAmount: parseInt(event.target[event.target.selectedIndex].attributes.timer.value)
    }))
    setErrors(errors => {
      return {
      ...errors,
      remindError: {
        ...errors.remindError,
        valid: true
      }}
    });
  }

  //Need to figure out a way to map throught these, rather than writing out. 
  function handleError() {
    if (errors.startError.valid === false) {
      setErrors(errors => ({
        ...errors,
        startError: {
          ...errors.startError,
          visible: true
        }
      }))
    }
    else {
      setErrors(errors => ({
        ...errors,
        startError: {
          ...errors.startError,
          visible: false
        }
      }))
    }
    if (errors.endError.valid === false) {
      setErrors(errors => ({
        ...errors,
        endError: {
          ...errors.endError,
          visible: true
        }
      }))
    }
    else {
      setErrors(errors => ({
        ...errors,
        endError: {
          ...errors.endError,
          visible: false
        }
      }))
    }
    if (errors.waterError.valid === false) {
      setErrors(errors => ({
        ...errors,
        waterError: {
          ...errors.waterError,
          visible: true
        }
      }))
    }
    else {
      setErrors(errors => ({
        ...errors,
        waterError: {
          ...errors.waterError,
          visible: false
        }
      }))
    }
    if (errors.remindError.valid === false) {
      setErrors(errors => ({
        ...errors,
        remindError: {
          ...errors.remindError,
          visible: true
        }
      }))
    }
    else {
      setErrors(errors => ({
        ...errors,
        remindError: {
          ...errors.remindError,
          visible: false
        }
      }))
    }
  }



  useEffect(() => {
    if (errors.startError.valid === true && errors.endError.valid === true && errors.waterError.valid === true && errors.remindError.valid === true) {
      setButtonValidate(true)
    }
    else {
      setButtonValidate(false)
    }
  }, [errors])



  return (
    <div className="questions App">
       <h2 className="title">hydration reminder setup</h2>
      <div className="question-box" value={time}>
        <Dropdown selectClass="selectBox" options={makeStartTimes} change={handleStartSelect} label="Start hydrating at: "/>
        <Dropdown selectClass="selectBox" options={makeEndTimes} change={handleEndSelect} label="Stop hydrating at: "/>
        <Slider sliderChange={handleSlider} sliderValue={sliderValue} sliderLabel="I want to drink:" litres={sliderValue <= 1 ? "litre" : "litres"}/>
        <Dropdown selectClass="selectBox selectMinutes" options={makeRemindTimes} change={handleRemindSelect} label="Remind me every: "/>
      </div>
      {buttonValidate ? <Link to="/water-page"><button className="get-started">Drink water now</button></Link> : <div><button className="get-started" onClick={handleError}>Drink water now</button></div>}
      {errors.startError.visible ? <ErrorMessage error="start time" /> : null }
      {errors.endError.visible ? <ErrorMessage error="end time" /> : null }
      {errors.waterError.visible ? <ErrorMessage error="water amount" />: null }
      {errors.remindError.visible ? <ErrorMessage error="remind frequency" /> : null }
      
      
      
    </div>
  )
}

export default Questions;


//Got a button within a route link. When that button is clicked it should:
//1. Happy path - go to the specified link if all fields are selected
//2. Raise an error message if one is not completed
//3. Raise two+ errors if 2+ fields not completed. 

//Updated the logic - if error.ERRORTYPE.valid = TRUE, then that means it is valid, and no error message required. 
//If valid = FALSE, then error message required. 
//ButtonValidate = TRUE, then link will work. 

