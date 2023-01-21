import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../redux/slice/usersSlice";

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const { users } = useSelector(state => state.users); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnUsernameChange = (event) => {
    setUsername(event.target.value);
  }

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
        <input
          className="login__form__input"
          value={username}
          onChange={handleOnUsernameChange}
          type="text"
          placeholder="Username"
        />
        <button className="btn login__form__btn">Log In</button>
      </form>

      {isError && 
        <span className="login__error">{error.message}</span>
      }
    </main>
  );
}

export default LogIn; 