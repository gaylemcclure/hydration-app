import { React, useState } from 'react';
import './styles/App.css';
import StartButton from './routes/StartButton';
import Questions from './routes/Questions';
import WaterPage from './routes/WaterPage';

function App() {
  const [start, setStart] = useState(0)
  const [startDrink, setStartDrink] = useState(false)

  function handleClick() {
    setStart(true)
  }

  function handleStartClick() {
    setStartDrink(true)
  }

  return (
    <div className="App">
      <header className="header">Drink more!</header>
      {start === 1 ? <Questions drinkClick={handleStartClick}/> : <StartButton startClick={handleClick}/>}
      {startDrink ? <WaterPage style={{visibility: "none"}}/> : null}
    </div>
  );
}

export default App;
