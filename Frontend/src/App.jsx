import { useState } from 'react'
import {BrowserRouter, Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import { RecoilRoot } from 'recoil'


import './App.css'
import Register from './components/Register'
import Login from './components/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <AppBar />
      </BrowserRouter>
    </>
  )
}

function AppBar(){
  return(
    <div>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </RecoilRoot>
    </div>
  )
}

export default App
