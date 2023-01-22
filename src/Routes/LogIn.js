import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "../redux/slice/usersSlice";
import '../styles/LogIn.css';

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const { users } = useSelector(state => state.users); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginInputRef = useRef();

  const handleOnUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  useEffect(() => {
    loginInputRef.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleOnLogin = (event) => {
    event.preventDefault();
    const user = users.find(user => user.name === username);
    if (user) {
      navigate('/');
      dispatch(setCurrentUser(username));
    }
    else {
      setIsError(true);
      setError({ message: 'User does not exist. Please register' });
    }
  }

  return (
    <main className="login">
      <form className="login__form" onSubmit={handleOnLogin}>
        <div className="login__form__main">
          <input
            className="login__form__input"
            ref={loginInputRef}
            value={username}
            onChange={handleOnUsernameChange}
            type="text"
            placeholder="Username"
          />
          {isError && <span className="login__error">{error.message}</span>}
        </div>
        <button className="btn login__form__btn-login">Log In</button>
        <span className="login__form__register">
          Dont have an accout? {"  "}
          <Link to="/register">
              Register
          </Link>
        </span>
      </form>
    </main>
  );
}

export default LogIn; 