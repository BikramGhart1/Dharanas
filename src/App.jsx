import { Route, Routes } from 'react-router-dom'
import './App.css'
import SigninWrapper from './components/SigninWrapper'
import Signup from './components/Signup'
import Login from './components/Login'
import HomePage from './components/HomePage'
import AuthGuard from './components/AuthGuard'

function App() {

  return (
    <>
      <Routes>
        
      <Route path='/' element={<AuthGuard />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path='/signin' element={
          <div className='flex justify-center signupWrapper items-center min-h-screen m-auto'>
            <SigninWrapper />
          </div>}>
          <Route index element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='login' element={<Login />} />
        </Route>
        <Route path='*' element={<h2>Resources not found</h2>} />
      </Routes>
    </>
  )
}

export default App
