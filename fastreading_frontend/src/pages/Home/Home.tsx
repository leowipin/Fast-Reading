import { SigninForm } from '../../components/Forms';
import styles from './Home.module.css';
import { Logo } from '../../components/Logo';
import { useState } from 'react';
import { SignupForm } from '../../components/Forms';

const Home = () => {
    const [isSignin, setIsSignin] = useState(true);
    
    const toggleForm = () =>{
        setIsSignin(!isSignin)
    }

    return(
        <div className={styles.homeContainer}>
            <div className={styles.header}>
                <Logo/>
            </div>
            <div className={styles.signinFormContainer}>
                { isSignin ? 
                    (<SigninForm onToggleForm={toggleForm}/>):
                    (<SignupForm onToggleForm={toggleForm}/>)
                }
                
            </div>
        </div>
    )
};

export default Home;