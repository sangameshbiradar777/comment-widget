import { useDispatch, useSelector } from "react-redux";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { removeCurrentUser } from "../redux/slice/usersSlice";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleOnLogOut = () => {
    dispatch(removeCurrentUser());
  }

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <ion-icon name="repeat"></ion-icon>
        <span className="navbar__logo__text">Comments</span>
      </div>
      <div className="navbar__info">
        {currentUser ? (
          <div className="navbar__user">
            <img
              className="navbar__user__avatar"
              src={currentUser.avatar}
              alt="Avatar"
            />
            <span className="navbar__user__name">{currentUser.name}</span>
          </div>
        ) : null}

        <div className="navbar__actions">
          {currentUser ? (
            <button onClick={handleOnLogOut} className="btn navbar__actions__logout">Log Out</button>
          ) : (
            <>
              <Link to="/login">
                <button className="btn navbar__actions__login">Log In</button>
              </Link>
              <Link to="/register">
                <button className="btn navbar__actions__register">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
