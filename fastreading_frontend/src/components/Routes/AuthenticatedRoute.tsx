import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";

const AuthenticatedRoute = ()=>{
    
    const { isAuthenticated, isLoading, logout } = useAuth();
    const token = localStorage.getItem('token')


    useEffect(() => {
      if (!token) {
        logout();
      }
    }, [token, logout]);

    if(isLoading){
        return;
    }

    if(!isAuthenticated || !token){
      return <Navigate to="/login" replace/>;
    }

    return <Outlet/>; 
}

export default AuthenticatedRoute;