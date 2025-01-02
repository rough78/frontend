import type { ButtonProps } from "../types/types";

export const Button: React.FC<ButtonProps> = ({
  onClick,
  imgUrl,
  altText,
  text,
  className,
}) => {
  return (
    <button onClick={onClick} className={className}>
      {imgUrl && <img src={imgUrl} alt={altText} />}
      {text && <p>{text}</p>}
    </button>
  );
};

export default Button;
