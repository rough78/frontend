import styles from "./Input.module.scss";

interface InputProps {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ placeholder, value, onChange }: InputProps) => {
  return (
    <input
      className={styles.input}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
