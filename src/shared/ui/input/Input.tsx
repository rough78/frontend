import { ReactNode } from 'react';
import styles from './Input.module.scss';

interface InputWrapperProps {
  children: ReactNode;
  label?: string;
}

export const InputWrapper = ({ children, label }: InputWrapperProps) => {
  return (
    <div className={styles.inputContainer}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        {children}
      </div>
    </div>
  );
}; 