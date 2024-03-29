import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPage from './routes/StartPage';
import Questions from './routes/Questions';
import WaterPage from './routes/WaterPage';
import TimerPage from './routes/TimerPage'
import './styles/App.css';

// var ghpages = require('gh-pages');

// ghpages.publish('public',{
//   user: {
//     name: "Gayle McClure",
//     email: 'gaylekdennison@gmail.com'
//   }
// }, function(err) {});

const App = () => {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<StartPage /> } />
        <Route path="/questions" element={<Questions />} />
        <Route path="/water-page" element={<WaterPage />} />
        <Route path="/timer-page" element={<TimerPage />} />
      </Routes>
    </BrowserRouter>
);
}

export default App;