import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Lobby from './screen/lobby'
import {SocketProvider} from './screen/Context/SocketProvide'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Lobby/>}/>
      </Routes>
    </>
  )
}

export default App
