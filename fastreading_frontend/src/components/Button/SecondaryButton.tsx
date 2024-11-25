import ButtonProps from "./ButtonProps"
import styles from "./Button.module.css"

const SecondaryButton = ({label, onClick, disabled = false, type}: ButtonProps) => {
    return (
        <button
            className={styles.secondaryButton}
            onClick={onClick}
            disabled = {disabled}
            type = {type}
        >
            {label}
        </button>
    )    
};

export default SecondaryButton;