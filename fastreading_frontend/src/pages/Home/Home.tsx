import SignInForm from '../../components/Forms/Signin/SigninForm';
import style from './Home.module.css';

const Home = () => {
    /*const toggleTheme = () => {
        const body = document.body;
        body.classList.toggle('dark-mode');
    };*/

    return(
        <div className={style.home}>
            <div className={style.signinContainer}>
                <SignInForm></SignInForm>
            </div>
            
        </div>
    )
};

export default Home;