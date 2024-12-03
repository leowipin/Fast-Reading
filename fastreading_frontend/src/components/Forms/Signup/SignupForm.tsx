import formStyles from "../Forms.module.css"
import FloatingInput from "../../Input/FloatingInput";
import { PrimaryButton } from "../../Button";
import SignupFormProps from "./SignupFormProps";
import { useState } from "react";
import { UserSignUpInputDTO } from "../../../types/User";
import { userService } from "../../../services/userService";

const SignUpForm = ({ onSubmit, onToggleForm, ...rest }: SignupFormProps) => {
    
    //api call
    const { signUp } = userService();
    //values
    const[email, setEmail] = useState<string>("");
    const[username, setUsername] = useState<string>("");
    const[password, setPassword] = useState<string>("");
    //validations
    const[isValidEmail, setIsValidEmail] = useState(true);
    const[isEmptyEmail, setIsEmptyEmail] = useState(false);
    const[passwordError, setPasswordError] = useState<string|null>(null);
    const[usernameError, setUsernameError] = useState<string|null>(null);

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user:UserSignUpInputDTO = {
            email:email,
            username: username,
            password: password
        }
        await signUp(user);
    };

    const emailValidationRegex = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const email = e.target.value;
        if(email!=""){
            const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;  
            setIsEmptyEmail(false)
            setIsValidEmail(emailRegex.test(email))
            setEmail(email);
            return;
        }
        setIsEmptyEmail(true);
        setIsValidEmail(true);
    }

    const passwordValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        if (password.length < 4) {
            setPasswordError("La contraseña debe tener al menos 4 caracteres.");
        } else if (password.length > 32) {
            setPasswordError("La contraseña no puede tener más de 32 caracteres.");
        } else {
            setPasswordError(null);
            setPassword(password);
        }
    };
   
    const usernameValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
        const username = e.target.value;
        if (username.length < 3) {
            setUsernameError("El nombre de usuario debe tener al menos 3 caracteres.");
        } else if (username.length > 20) {
            setUsernameError("La nombre de usuario no puede tener más de 20 caracteres.");
        } else {
            setUsernameError(null);
            setUsername(username);
        }
    };


    return (
        <form {...rest} onSubmit={handleSubmit} className={formStyles.signForm}>
            <h2>Registrarse</h2>
            <div className={formStyles.textInput}>
                <FloatingInput type="text" labelContent="Nombre de usuario" onChange={usernameValidation}></FloatingInput>
                {usernameError && <p>{usernameError}</p>}
            </div>
            <div className={formStyles.textInput}>
                <FloatingInput type="email" labelContent="Correo Electrónico" onChange={emailValidationRegex}></FloatingInput>
                {!isValidEmail && <p>El correo no es válido.</p>}
                { isEmptyEmail && <p>Ingrese un correo.</p>}
            </div>
            <div className={formStyles.textInput}>
                <FloatingInput type="password" labelContent="Contraseña" onChange={passwordValidation}></FloatingInput>    
                {passwordError && <p>{passwordError}</p>}
                
            </div>
            
            <PrimaryButton label="Registrarse" type="submit"></PrimaryButton>
            <a href="#" onClick={onToggleForm}>¿Ya tienes una cuenta? ¡Inicia sesión!</a>
        </form>
    );
};

export default SignUpForm;
