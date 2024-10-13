import { useState } from 'react'
import {BrowserRouter, Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import { RecoilRoot } from 'recoil'


import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/DashBoard'
import AddQuiz from './components/AddQuiz'
import QuizPage from './components/QuizPage'

import ResultsPage from './components/ResultsPage';

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
    <div className='bg-[#e5ecf3] min-h-screen'>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path='/DashBoard' element={<Dashboard />} />
          <Route path='/Add-Quiz' element={<AddQuiz />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/results" element={<ResultsPage />} />

        </Routes>
      </RecoilRoot>
    </div>
  )
}

export default App
