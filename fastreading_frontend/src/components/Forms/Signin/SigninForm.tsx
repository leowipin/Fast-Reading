import SigninFormProps from "./SigninFormProps";
import FloatingInput from "../../Input/FloatingInput";
import { PrimaryButton } from "../../Button";
import formStyles from "../Forms.module.css";
import { useState } from "react";
import { userService } from "../../../services/userService";
import { UserLoginInputDTO } from "../../../types/User";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { storeCredentialsInBrowser } from "../../../utils/storeCredentials";
  

const SignInForm = ({onSubmit, onToggleForm, ...rest}: SigninFormProps) => {

    const[email, setEmail] = useState<string>("");
    const[password, setPassword] = useState<string>("");
    const[validationError, setValidationError] = useState<string|null>(null);
    const { signIn } = userService();
    const {login} = useAuth();
    const navigate  = useNavigate();

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;  
        const validationError = emailRegex.test(email) && (password.length>3 && password.length<32) ? null :"Correo o contraseña incorrecto"
        setValidationError(validationError);
        
        if(validationError) return;
    
        const user:UserLoginInputDTO = {
            email:email,
            password:password
        }
        
        try{
            const res = await signIn(user);          
            const token = res.data.token;
            login(token);
            storeCredentialsInBrowser(email, password);
            navigate("/home");
        } catch (error:any){
            setValidationError(error.response.data.error_message);          
        }
        
    }

    return(
        
            <form {...rest} onSubmit={handleSubmit} className={formStyles.signForm}>
                {validationError && <div className={formStyles.errorMessage}>{validationError}</div>}
                <h2>Iniciar Sesión</h2>
                <FloatingInput type="email" labelContent="Correo Electrónico" onChange={(e)=>{setEmail(e.target.value)}}></FloatingInput>
                <FloatingInput type="password" labelContent="Contraseña" onChange={(e)=>{setPassword(e.target.value)}}></FloatingInput>
                <PrimaryButton label="Iniciar sesión" type="submit"></PrimaryButton>
                <a href="#" onClick={(e) => {e.preventDefault(); onToggleForm();}}>¿No estas registrado? ¡Registrate!</a>
                           
            </form>
                
    )
}

export default SignInForm