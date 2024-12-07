import { useAuth } from "../../hooks/useAuth"
import Landing from "../../pages/Landing";
import { Navigate } from "react-router-dom";

const RootRoute = () =>{

    const { isAuthenticated } = useAuth();

    if(isAuthenticated){
        return <Navigate to='/app' replace />;
    }

    return <Landing/>;

}

export default RootRoute;