import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../hoc/UserProvider";

export const RequireAuth = ({children}) => {
    const userParams = useContext(UserContext)
    if(!userParams) {
        return <Navigate to={'/login'}/>
    } else {
        return children
    }
}