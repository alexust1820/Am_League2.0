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
import { CreateTeam } from "./pages/CreateTeam"
import { TeamList } from "./pages/TeamsList"
import { InvitePage } from "./pages/InvitePage"
import { PositionProvider } from "./hoc/PosiotionProvider"


export default function App() {
  return (
    <PositionProvider>
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
          <Route path="/create-team" element={
            <RequireAuth>
              <CreateTeam/>
            </RequireAuth>
          } />
          <Route path="/teams" element={<TeamList/>} />
          <Route path="/invite-new-user/:email/:team_id" element={<InvitePage/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </UserProvider>
    </PositionProvider>
  )
}