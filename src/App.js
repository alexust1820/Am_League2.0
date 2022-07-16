import React, {useEffect, useState} from "react";
import { UserParamsContext } from "./context";
import MainScreen from "./Main";
import {Routes, Route} from 'react-router-dom';
import Registration from "./Registration";
import Login from "./Login";
import Profile from "./Profile";
import axios from "axios";
import CreateTeam from "./CreateTeam";
import InviteToTeam from "./InviteToTeam";

function App() {
  
  const token = localStorage.getItem("jwt");
  const [userParams, setUserParams] = useState('');

  const getUserParams = async () => {
    axios({
      method: "post",
      url: "http://localhost:8080/userInfo",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then( async (res) => {
      const data = await res.data
      setUserParams(data)
    })
  }

  useEffect(() => {
    if(userParams == '') {
      getUserParams();
    }
  })

  return (
    <>
      <UserParamsContext.Provider value={userParams}>
        <Routes>
          <Route path="/" element={<MainScreen/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/profile/create-team" element={<CreateTeam/>}/>
          <Route path="/invite-to-team" element={<InviteToTeam/>}/>
        </Routes>
      </UserParamsContext.Provider>
    </>
  );
}

export default App;
