import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import checked from "@/shared/assets/images/common/checked.svg";

interface CustomToastProps {
  icon: boolean;
  message: string;
  position?: ToastOptions["position"];
  linkTo?: string;
  linkText?: string;
}

const Toast: React.FC<CustomToastProps> = ({
  icon,
  message,
  position = "bottom-center",
  linkTo,
  linkText,
}) => {
  const navigate = useNavigate();
  const showToast = () => {
    toast(
      <div className="toast-content">
        <div className="toast-content-left">
          {icon && <img src={checked} />}
          <span>{message}</span>
        </div>
        {linkTo && (
          <button
            className="toast-link"
            onClick={() => {
              navigate(linkTo);
            }}
          >
            {linkText}
          </button>
        )}
      </div>,
      {
        position: position,
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        closeButton: false,
      }
    );
  };

  return (
    <div className="toast-container">
      <button onClick={showToast}>Show Toast</button>
    </div>
  );
};

export default Toast;
