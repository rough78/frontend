import { ReactNode } from 'react';
import styles from './Input.module.scss';

interface InputWrapperProps {
  children: ReactNode;
  label?: ReactNode;
  className?: string;
}

export const InputWrapper = ({ children, label, className }: InputWrapperProps) => {
  return (
    <div className={styles.inputContainer}>
      {label && (
        <label className={`${styles.label} ${className || ''}`}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        {children}
      </div>
    </div>
  );
};