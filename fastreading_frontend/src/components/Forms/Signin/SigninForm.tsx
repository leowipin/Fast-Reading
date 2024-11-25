import SigninFormProps from "./SigninFormProps";
import styles from "./SigninForm.module.css"
import FloatingInput from "../../Input/FloatingInput";
import { PrimaryButton, SecondaryButton } from "../../Button";

const SignInForm = ({onSubmit, ...rest}: SigninFormProps) => {

    const handleSubmit = () => {
        console.log("handlesubmit")
    }

    return(
        <form {...rest} onSubmit={handleSubmit} className={styles.signinForm} >
            <FloatingInput type="email" labelContent="Correo Electrónico"></FloatingInput>
            <SecondaryButton label="Salir" type="button"></SecondaryButton>
            <PrimaryButton label="Iniciar sesión" type="submit"></PrimaryButton>
        </form>
    )
}

export default SignInForm