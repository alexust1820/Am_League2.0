import { Navigate } from "react-router-dom";

export const RequireAuth = ({children}) => {
    const jwt = localStorage.getItem('jwt')
    if(!jwt) {
        return <Navigate to={'/login'}/>
    } else {
        return children
    }
}