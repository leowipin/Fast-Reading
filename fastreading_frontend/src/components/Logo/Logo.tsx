import styles from './Logo.module.css'
import { useEffect, useState } from "react";

const Logo = () => {

    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Leer tema guardado en localStorage
        return localStorage.getItem("theme") === "dark";
    });

    // Cambiar el tema y guardarlo en localStorage
    const toggleTheme = () => {
        const body = document.body;
        if (isDarkMode) {
            body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
        } else {
            body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
        }
        setIsDarkMode(!isDarkMode);
    };

    // Aplicar el tema guardado al cargar la página
    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark") {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }, []);

    return(
        <div className={styles.logoContainer}>
            <img className={styles.logo} src="src\assets\images\logos\logo.png" alt="Logo" onClick={toggleTheme}></img>
        </div>
        
    )
}

export default Logo