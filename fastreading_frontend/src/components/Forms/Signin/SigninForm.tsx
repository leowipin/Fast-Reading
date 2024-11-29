import SigninFormProps from "./SigninFormProps";
import FloatingInput from "../../Input/FloatingInput";
import { PrimaryButton } from "../../Button";
import formStyles from "../Forms.module.css";
import styles from "./SigninForm.module.css";
import { useState } from "react";

const SignInForm = ({onSubmit, onToggleForm, ...rest}: SigninFormProps) => {

    const[email, setEmail] = useState<string>("");
    const[password, setPassword] = useState<string>("");
    const[validationError, setValidationError] = useState<string|null>(null);
    
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;  
        const validationError = emailRegex.test(email) && password.length>3 ? null :"Correo o contraseña incorrecta"
        setValidationError(validationError);
        if(validationError){
            e.preventDefault();
        }
    }

    return(
        
            <form {...rest} onSubmit={handleSubmit} className={formStyles.signForm}>
                {validationError && <div className={styles.validationMessage}>{validationError}</div>}
                <h2>Iniciar Sesión</h2>
                <FloatingInput type="text" labelContent="Correo Electrónico" onChange={(e)=>{setEmail(e.target.value)}}></FloatingInput>
                <FloatingInput type="password" labelContent="Contraseña" onChange={(e)=>{setPassword(e.target.value)}}></FloatingInput>
                <PrimaryButton label="Iniciar sesión" type="submit"></PrimaryButton>
                <a href="#" onClick={(e) => {e.preventDefault(); onToggleForm();}}>¿No estas registrado? ¡Registrate!</a>
                           
            </form>
        
        
    )
}

export default SignInForm