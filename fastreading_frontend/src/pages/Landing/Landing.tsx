import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../components/Button";


const Landing = () => {

    const navigate = useNavigate();

    const goToLogin = ()=>{
        navigate("/login");
    }

    return (
     <PrimaryButton label="Iniciar sesión" onClick={goToLogin}></PrimaryButton>   
    );

};

export default Landing;