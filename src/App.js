import React from "react"
import {Routes, Route} from "react-router-dom"
import Main from "./pages/Main"
import { NotFound } from "./pages/NotFound"
import { Registration } from "./pages/Registration"
import { Login } from "./pages/Login"
import './styles/App.css'
import './styles/container.css'
import { Profile } from "./pages/Profile"
import { UserProvider } from "./hoc/UserProvider"
import { RequireAuth } from "./hoc/RequireAuth"


export default function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={
          <RequireAuth>
            <Profile/>
          </RequireAuth>
        } />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </UserProvider>
  )
}