import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'flowbite-react';
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Projects from './pages/Projects'
import Header from './components/Header'
import FooterComponent from './components/Footer'
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import CreatePost from './pages/CreatePost';
export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute/>}>
            <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute/>}>
            <Route path="/createpost" element={<CreatePost />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route  path="/signup" element={<Signup />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <FooterComponent/>
    </BrowserRouter>
  )
}
