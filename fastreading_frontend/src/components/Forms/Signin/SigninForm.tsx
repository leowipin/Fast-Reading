import SigninFormProps from "./SigninFormProps";
import styles from "./SigninForm.module.css"
import FloatingInput from "../../Input/FloatingInput";
import { PrimaryButton } from "../../Button";

const SignInForm = ({onSubmit, ...rest}: SigninFormProps) => {

    const handleSubmit = () => {
        console.log("handlesubmit")
    }

    return(
        <form {...rest} onSubmit={handleSubmit} className={styles.signinForm} >
            <h1>Iniciar Sesión</h1>
            <FloatingInput type="email" labelContent="Correo Electrónico"></FloatingInput>
            <FloatingInput type="password" labelContent="Contraseña"></FloatingInput>
            <PrimaryButton label="Iniciar sesión" type="submit"></PrimaryButton>
        </form>
    )
}

export default SignInForm