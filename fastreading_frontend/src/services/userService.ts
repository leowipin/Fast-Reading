import { useApiClient } from "../hooks/useApiClient";
import { UserLoginInputDTO, UserSignUpInputDTO } from "../types/User";

export const userService = () =>{
    
    const apiClient = useApiClient();

    const signUp = async (user: UserSignUpInputDTO) =>{
        const response = await apiClient.post("/user/signup", user);
        return response; 
    }

    const signIn = async (user: UserLoginInputDTO) =>{
        const response = await apiClient.post("user/login", user);
        return response;
    }

    const getTest = async () =>{
        const response = await apiClient.get("user/test");
        return response
    }

    return{
        signUp,
        signIn,
        getTest,
    }
}