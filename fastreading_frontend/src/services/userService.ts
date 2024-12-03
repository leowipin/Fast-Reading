import { useApiClient } from "../hooks/useApiClient";
import { UserSignUpInputDTO } from "../types/User";

export const userService = () =>{
    
    const apiClient = useApiClient();

    const signUp = async (user: UserSignUpInputDTO) =>{
        const { data } = await apiClient.post("/user/signup", user)
        return data; 
    }

    return{
        signUp
    }
}