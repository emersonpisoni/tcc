import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Board } from './components/Board/Board';
import { Menu } from './components/Menu/Menu';
import { HashRouter, Routes, Route } from 'react-router-dom';
import socketClient from 'socket.io-client'
import { getSurvivorsJson } from './api/api';
import './fonts/Zombie/zombie.ttf'

const root = ReactDOM.createRoot(document.getElementById('root'));

// const socket = socketClient('https://protected-crag-78513.herokuapp.com')
const socket = socketClient('http://localhost:4000')
socket.on('connect', () => {
  console.log('Conexão inicial')
})


root.render(
  <HashRouter>
    <Routes>
      <Route exact path='/' element={<Menu socket={socket} />} />
      <Route exact path='board' element={<Board socket={socket} survivors={getSurvivorsJson()} />} />
    </Routes>
  </HashRouter>
);
