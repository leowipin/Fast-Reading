import styles from './Logo.module.css'

const Logo = () => {

    const toggleTheme = () => {
        const body = document.body;
        body.classList.toggle('dark-mode');
    }

    return(
        <div className={styles.logoContainer}>
            <img className={styles.logo} src="src\assets\images\logos\logo.png" alt="Logo" onClick={toggleTheme}></img>
        </div>
        
    )
}

export default Logo