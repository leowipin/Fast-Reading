export interface Token{
    username:string;
    email:string;
    role:string;
    permissions:string[];
}

export interface AuthContextProps {
    isAuthenticated: boolean;
    role: string | null;
    permissions: string[] | null;
    login: (token: string) => void;
    logout: () => void;
    isLoading: boolean;
}