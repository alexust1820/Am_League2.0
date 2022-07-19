import axios from "axios";
import React from "react";
import { useState } from "react";

export const UserContext = React.createContext(null)

export const UserProvider = ({children}) => {
    const [userParams, setUserParams] = useState(null)
    const jwt = localStorage.getItem('jwt')

    if(jwt) {
        axios({
            method: "post",
            url: "http://localhost:8080/user-params",
            headers: {
            Authorization: `Bearer ${jwt}`
            }
        }).then( async (res) => {
            setUserParams(res.data)
        })
    }

    return(
        <UserContext.Provider value={userParams}>
            {children}
        </UserContext.Provider>
    )
}