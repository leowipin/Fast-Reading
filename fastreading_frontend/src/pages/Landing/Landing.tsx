import { SigninForm } from '../../components/Forms';
import styles from './Landing.module.css';
import { Logo } from '../../components/Logo';
import { useState } from 'react';
import { SignupForm } from '../../components/Forms';

const Landing = () => {
    const [isSignin, setIsSignin] = useState(true);
    
    const toggleForm = () =>{
        setIsSignin(!isSignin)
    }

    return(
        <div className={styles.landingContainer}>
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

export default Landing;