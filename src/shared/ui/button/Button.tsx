import styles from "./Button.module.scss";

interface ButtonProps {
  text?: string;
  image?: string;
  altText?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ text, image, altText, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {image && <img src={image} alt={altText} className="btn-image" />}
      {text && <span className="btn-text">{text}</span>}
    </button>
  );
};

export default Button;
