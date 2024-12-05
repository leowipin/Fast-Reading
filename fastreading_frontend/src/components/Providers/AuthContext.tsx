import { createContext, ReactNode, useEffect, useState } from "react";
import { AuthContextProps, Token } from "../../types/Auth";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext<AuthContextProps|undefined>(undefined);

const AuthProvider = ({children}:{children: ReactNode}) => {
    const[isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const[role, setRole] = useState<string|null>(null);
    const[isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            try{
                setRole(decodeToken(token));
            } catch {
                logout();
            }
            setIsAuthenticated(true);
            setIsLoading(false);
        }
    },[])

    const login = (token:string) =>{
        localStorage.setItem('token', token);
        setRole(decodeToken(token));
        setIsAuthenticated(true);
        setIsLoading(false);
    }

    const logout = () =>{
        localStorage.removeItem('token');
        setRole(null);
        setIsAuthenticated(false);
        setIsLoading(false);
    }

    const decodeToken = (token:string):string => {
        const decoded:Token = jwtDecode(token);
        return decoded.role;
    }

    return(
        <AuthContext.Provider value={{isAuthenticated, role, login, logout, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider};