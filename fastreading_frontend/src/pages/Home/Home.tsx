import { useEffect, useState } from 'react'
import styles from './Home.module.css'
import { userService } from '../../services/userService';

const Home = ()=>{
    const[test, setTest] = useState<any>();
    const {getTest} = userService();

    useEffect(()=>{
        getT();
    }, [])

    async function getT(){
        try{
            const response:any = await getTest();
            console.log(response.data.saludo)
            setTest(response.data.saludo);
        } catch (error:any){
            console.log(error.response.data.error_message)
        }
        
    }
    

    return(
        <div className={styles.homeContainer}>
            <h1>Home</h1>
            <p>{test}</p>
        </div>
    )
}

export default Home