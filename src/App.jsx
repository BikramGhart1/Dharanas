import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import SigninWrapper from './components/SigninWrapper'
import Signup from './components/Signup'
import Login from './components/Login'
import HomePage from './components/HomePage'
import AuthGuard from './components/AuthGuard'
import Layout from './components/Layout'
import ProfilePage from './components/ProfilePage'
import Saved from './components/profileNavs/Saved'
import Posts from './components/profileNavs/Posts'
import Comments from './components/profileNavs/Comments'
import Liked from './components/profileNavs/Liked'
import CreatePost from './components/CreatePost'
import User from './components/User'
import FollowList from './components/FollowList'
import Followee from './components/Followee'

function App() {

  return (
    <>
      <Routes>

        <Route path='/' element={<AuthGuard />}>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='/createPost' element={<CreatePost />} />
            <Route path='/profile' element={<ProfilePage />}>
              <Route index element={<Posts />} />
              <Route path='saved' element={<Saved />} />
              <Route path='comments' element={<Comments />} />
              <Route path='liked' element={<Liked />} />
              <Route path='followee' element={<Followee />}>
                <Route index element={<Navigate to='followers' replace />} />
                <Route path='followers' element={<FollowList type='followers'/>} />
                <Route path='following' element={<FollowList type='followings' />} />
              </Route>
            </Route>
            <Route path='users/:uid' element={<User />}>
              <Route index element={<Posts />} />
              <Route path='comments' element={<Comments />} />
              <Route path='follows' element={<Followee />}>
                <Route index element={<Navigate to='followers' replace />} />
                <Route path='followers' element={<FollowList type='followers'/>} />
                <Route path='following' element={<FollowList type='followings' />} />
              </Route>
            </Route>
          </Route>
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
