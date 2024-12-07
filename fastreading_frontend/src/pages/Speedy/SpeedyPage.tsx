import { useEffect, useState } from 'react'
import styles from './Speedy.module.css'
import { userService } from '../../services/userService';
import { PrimaryButton } from '../../components/Button';
import { useNavigate } from 'react-router-dom';

const SpeedyPage = ()=>{
    const[test, setTest] = useState<any>();
    const {getTest} = userService();
    const navigate = useNavigate();

    useEffect(()=>{
        getT();
    }, [])

    const goToPhotoMemoryPage = ()=>{
        navigate("photoMemory");
    }

    async function getT(){
        try{
            const response:any = await getTest();
            setTest(response.data.saludo);
        } catch (error:any){
            setTest(error.response.data.error_message)
        }
        
    }
    

    return(
        <div className={styles.speedyContainer}>
            <h1>Speedy</h1>
            <p>{test}</p>
            <PrimaryButton label='discover this premium thing' onClick={goToPhotoMemoryPage}></PrimaryButton>
        </div>
    )
}

export default SpeedyPage