import styles from './FloatingInput.module.css';
import InputProps from './InputProps';

const FloatingInput = ({ type, id, value, onChange, labelContent, ...rest }: InputProps) => {
  

  return (
    <div className={styles.floatingInput}>
      <input
        {...rest}
        id={id}
        type={type}
        placeholder=''
        onChange={onChange}
      />
      <label htmlFor={id}>{labelContent}</label>
    </div>
    
  );
};

export default FloatingInput;
