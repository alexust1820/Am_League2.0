import axios from "axios";
import React, { useState } from "react";

export const UserContext = React.createContext(null)
const jwt = localStorage.getItem('jwt')

export const UserProvider = ({children}) => {
    const [userParams, SetUserParams] = useState({
        id: null,
        name: "",
        surname: "",
        email: "",
        position_id: null
    })

    const url = "http://localhost:8080/user-params"

    const GetUserParams = async () => {
        axios({
            method: "post",
            url: url,
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then(async (res) => {
            SetUserParams(res.data)
        })
    }

    if(!userParams.id & Boolean(jwt) & jwt !== undefined) {
        GetUserParams()
    }

    return(
        <UserContext.Provider value={
                {
                    id: userParams.id,
                    name: userParams.name,
                    surname: userParams.surname,
                    email: userParams.email,
                    position_id: userParams.position_id
                }
            }>
            {children}
        </UserContext.Provider>
    )
}