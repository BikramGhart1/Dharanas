import { Route, Routes } from 'react-router-dom'
import './App.css'
import SigninWrapper from './components/SigninWrapper'
import Signup from './components/Signup'
import Login from './components/Login'
import HomePage from './components/HomePage'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<SigninWrapper/>}>
      <Route index element={<Login/>}/>
      <Route path='signup' element={<Signup />} />
      <Route path='login' element={<Login />} />
      </Route>
      <Route path='/home' element={<HomePage/>}/>
    
    </Routes>
    </>
  )
}

export default App
