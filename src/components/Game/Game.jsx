import './style.css'
import { Link } from "react-router-dom";
import socketClient from 'socket.io-client'

export function Game() {
  return <div>
    <Link to={`board`}>Your Name</Link>
  </div>
}