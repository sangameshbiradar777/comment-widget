import { useEffect, useState } from "react";
import "../styles/Error.css";

const Error = ({ message }) => {
  const [isActive, setIsActive] = useState(true);

  const handleOnCloseError = () => {
    setIsActive(false);
  }

  return (
    isActive && (
      <div className="error">
        <button onClick={handleOnCloseError} className="btn error__close">
          <ion-icon name="close-circle"></ion-icon>
        </button>
        <ion-icon name="alert-circle"></ion-icon>
        <span className="error__message">{message}</span>
      </div>
    )
  );
};

export default Error;
