import styles from './FloatingInput.module.css';
import InputProps from './InputProps';

const FloatingInput = ({ type, id, value, onChange, labelContent, pattern, ...rest }: InputProps) => {
  
  const myPattern = type === 'email'? '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$': undefined;

  return (
    <div className={styles.floatingInput}>
      <input
        {...rest}
        id={id}
        type={type}
        placeholder=''
        pattern={myPattern}
      />
      <label htmlFor={id}>{labelContent}</label>
    </div>
    
  );
};

export default FloatingInput;
