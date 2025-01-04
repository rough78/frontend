export interface TextareaProps {
    value: string;
    onChange: (value: string) => void;
    maxLength?: number;
    placeholder?: string;
    className?: string;
  }