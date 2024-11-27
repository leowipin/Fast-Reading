import { SignInForm } from '../../components/Forms';
import style from './Home.module.css';
import { Logo } from '../../components/Logo';

const Home = () => {
    /*const toggleTheme = () => {
        const body = document.body;
        body.classList.toggle('dark-mode');
    };*/

    return(
        <div className={style.homeContainer}>
            <div className={style.header}>
                <Logo/>
            </div>
            <div className={style.signinFormContainer}>
                <SignInForm/>
            </div>
        </div>
    )
};

export default Home;