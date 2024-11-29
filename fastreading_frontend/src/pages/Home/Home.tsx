import { SignInForm } from '../../components/Forms';
import styles from './Home.module.css';
import { Logo } from '../../components/Logo';

const Home = () => {
    /*const toggleTheme = () => {
        const body = document.body;
        body.classList.toggle('dark-mode');
    };*/

    return(
        <div className={styles.homeContainer}>
            <div className={styles.header}>
                <Logo/>
            </div>
            <div className={styles.signinFormContainer}>
                <SignInForm/>
            </div>
        </div>
    )
};

export default Home;