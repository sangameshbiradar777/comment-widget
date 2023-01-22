import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { addUser } from "../redux/slice/usersSlice";
import { useNavigate } from "react-router-dom";
import { AVATAR_BASE_URL } from "../config";
import '../styles/Register.css';
import { Link } from "react-router-dom";

const Register = () => {
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const registerInputRef = useRef();


  const handleOnUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  useEffect(() => {
    registerInputRef.current.focus();
  }, [])

  const createUser = () => {
    return {
      name: username,
      id: nanoid(),
      registeredOn: new Date().getTime(),
      avatar: `${AVATAR_BASE_URL}${username}`
    }
  }

  const handleOnRegister = async (event) => {
    event.preventDefault();
    setIsError(false);
    setError({});
    const userAlreadyExists = users.find(user => user.name === username);

    if (userAlreadyExists) {
      setIsError(true);
      setError({ message: 'User already exitst. Please Login' });
    }
    else {
      const newUser = createUser();
      dispatch(addUser(newUser));
      navigate('/login');
    }
  }

  return (
    <main className="register">
      <form className="register__form" onSubmit={handleOnRegister}>
        <div className="register__form__main">
          <input
            ref={registerInputRef}
            className="register__form__input"
            type="text"
            value={username}
            onChange={handleOnUsernameChange}
            placeholder="Username"
          ></input>
          {isError && <span className="register__error">{error.message}</span>}
        </div>
        <button className="btn register__form__btn-register" type="submit">
          Register
        </button>
        <span className="register__form__login">Already have an accout? {"  "}
          <Link to="/login">
            Log In
          </Link>
        </span>
      </form>
    </main>
  );
};

export default Register;
