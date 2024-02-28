import React from 'react';

function Slider(props) {

  return (
    <div className="slider">
      <label className="sliderLabel">
        {props.sliderLabel}
        <input className="sliderBox" type="range" name="waterAmount" value={props.sliderValue} id="waterAmount" min="0.5" max="4" step="0.5" onChange={props.sliderChange}/>
        <output className="outputText">{props.sliderValue} {props.litres}</output>
      </label>
    </div>
  )
}

export default Slider;