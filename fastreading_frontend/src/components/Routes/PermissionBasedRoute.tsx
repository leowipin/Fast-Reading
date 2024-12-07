import { useAuth } from "../../hooks/useAuth"
import { PrimaryButton, SecondaryButton } from "../Button";

const PermissionBasedRoute = ({allowedPermission, children}:{allowedPermission:string, children:React.ReactNode})=>{

    const { isLoading, permissions } = useAuth();

    if(isLoading){
        return;
    }

    if(!permissions?.includes(allowedPermission)){
        return <div style={{backgroundColor:"yellow"}}>NO TIENES ACCESO A ESTA PAGINA, HASTE PREMIUN
            <PrimaryButton label="hacerse premium"></PrimaryButton>
            <SecondaryButton label="volver"></SecondaryButton>
        </div>
        //navigate to non-acces-permissions
    }

    return (
        <>
            {children}
        </>
    )

}

export default PermissionBasedRoute;