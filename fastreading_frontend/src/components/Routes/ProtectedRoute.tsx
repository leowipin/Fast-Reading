import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"

const ProtectedRoute = ({allowedRoles}:{allowedRoles:string[]}) =>{

    const {isAuthenticated, role, isLoading} = useAuth();
    
    if (isLoading) {
        return;
    }

    if(!isAuthenticated){
        return <Navigate to="/"/>;
    }

    if(!allowedRoles.includes(role||''))
        //redirect to buy premium user
        return <Navigate to="/" replace/>

    return <Outlet/>

}

export default ProtectedRoute;