import './App.css'
import NavBar from './components/NavBar'
import MainBody from './pages/MainBody'
import RightBar from './components/RightBar'
import { Outlet, Route, Routes } from 'react-router-dom'
import { lazy, Suspense, useState } from "react";
import ProfilePage from './pages/ProfilePage'
// const MainBody = lazy(() => import("./pages/MainBody"));
const OtherPage = lazy(() => import("./pages/OtherPage"));
const Registration = lazy(() => import("./pages/Registration"));
const Login = lazy(() => import("./pages/Login"));
// const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const Followers = lazy(() => import("./pages/Followers"));
const Following = lazy(() => import("./pages/Following"));


function App() {
  const NavSideBar = () => {
    return (
            <div className="grid grid-cols-3">
              <div className="col-start-1 flex justify-end">
                <NavBar className="self-end w-2/5" />
              </div>
            <Outlet className="col-span-2"/>
            <div className="col-start-3">
              <RightBar />
            </div>
            </div>
          );
      };

  return (
    <div className='overflow-hidden'>
      
          <Routes>
            <Route path="/" element={<NavSideBar />}>
              <Route path="/" element={<MainBody />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="/other" element={<OtherPage />} />
              <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="/:id/followers" element={<Followers />} />
              <Route path="/:id/following" element={<Following />} />
            </Route>                  
          </Routes>
      </div>

  )
}

export default App
