import styles from "./Textarea.module.scss";
interface TxtProps {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
const Textarea = ({ placeholder, value, onChange }: TxtProps) => {
  return (
    <textarea
      className={styles.textarea}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    >
      Textarea
    </textarea>
  );
};

export default Textarea;
