import { ChangeEvent } from 'react';
import styles from './Textarea.module.scss';
import type { TextareaProps } from '../types/types';

const Textarea = ({
  value,
  onChange,
  maxLength = 200,
  placeholder,
  className
}: TextareaProps) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.container}>
      <textarea
        className={`${styles.textarea} ${className}`}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Textarea;