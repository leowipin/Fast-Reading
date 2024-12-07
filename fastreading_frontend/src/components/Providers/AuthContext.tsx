import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { AuthContextProps, Token } from "../../types/Auth";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext<AuthContextProps|undefined>(undefined);

const AuthProvider = ({children}:{children: ReactNode}) => {
    const[isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const[role, setRole] = useState<string|null>(null);
    const[permissions, setPermissions] = useState<string[]|null>(null);
    const[isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            try{
                setRole(decodeToken(token).role);
                setPermissions(decodeToken(token).permissions)
                setIsAuthenticated(true);
            } catch {
                logout();
            }
            setIsLoading(false);
        }
    },[])

    const login = (token:string) =>{
        localStorage.setItem('token', token);
        setRole(decodeToken(token).role);
        setPermissions(decodeToken(token).permissions);
        setIsAuthenticated(true);
        setIsLoading(false);
    }

    const logout = useCallback(() =>{
        localStorage.removeItem('token');
        setRole(null);
        setPermissions(null);
        setIsAuthenticated(false);
        setIsLoading(false);
    }, [])

    const decodeToken = (token:string):Token => {
        const decoded:Token = jwtDecode(token);
        return decoded;
    }

    return(
        <AuthContext.Provider value={{isAuthenticated, role, permissions, login, logout, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider};