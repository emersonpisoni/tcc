import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Board } from './components/Board/Board';
import { Game } from './components/Game/Game';
import { RouterProvider, createHashRouter, HashRouter, Routes, Route } from 'react-router-dom';
import socketClient from 'socket.io-client'
import { getSurvivorsJson } from './api/api';

const root = ReactDOM.createRoot(document.getElementById('root'));

const socket = socketClient('http://localhost:4000')
socket.on('connect', () => {
  console.log('Conectado no front')
})

socket.on('PlayerConnected', (players) => {
  console.log(players)
})

socket.on('PlayersRefresh', players => {
  console.log(players)
})



root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route exact path='/' element={<Game />} />
        <Route exact path='board' element={<Board socket={socket} survivors={getSurvivorsJson()} />} />
      </Routes>
    </HashRouter>

    {/* <RouterProvider router={router} /> */}
  </React.StrictMode>
);
