import React from 'react';
import { Link, Outlet } from "react-router-dom";
import Background from '../components/Background';

function StartPage(props) {

  return (
    <div className="App">
      <Background />
      <header className="App-header">Hydrate</header>
      <p className="startText">Struggle with drinking water? Use this handy reminder to fit in your daily requirements of H2O.</p>
      <Link to="/questions"><button className="start-button">Start</button></Link>
      <Outlet />
    </div>
  )
}

export default StartPage;