import styles from './Button.module.css';
import ButtonProps from './ButtonProps';

const PrimaryButton = ({ label, onClick, disabled = false, type, }: ButtonProps) => {
  return (
    <button
      className={styles.primaryButton}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
