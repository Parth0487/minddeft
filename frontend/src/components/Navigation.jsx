import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { setLogin, setUser } from "../store/actions/user.actions";
import { useSelector } from "react-redux";
import { apiCall } from "../common/helper";

const Navigation = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    let response = await apiCall("GET", "getProfile", {}, {});

    if (response && response.success) {
      dispatch(setUser(response.data));
    } else {
      alert(response.message);
    }
  };

  const logout = () => {
    if (window.confirm("Are you sure want to logout?")) {
      dispatch(setLogin(false));
      localStorage.removeItem("AUTH_TOKEN");
      navigate("/");
    }
  };

  return (
    <div className="navigation">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-2">
        <a className="navbar-brand" href="#">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/001/834/253/small/interracial-friends-avatars-characters-free-vector.jpg"
            alt="Friends"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link
                className={[
                  "nav-link",
                  location.pathname == "/feed" ? "active" : "",
                ].join(" ")}
                to="/feed"
              >
                Feed
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={[
                  "nav-link",
                  location.pathname == "/friends" ? "active" : "",
                ].join(" ")}
                to="/friends"
              >
                Friends
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={[
                  "nav-link",
                  location.pathname == "/requests" ? "active" : "",
                ].join(" ")}
                to="/requests"
              >
                Requests
              </Link>
            </li>
          </ul>

          <div className="align-middle">
            <label className="mr-4 ">
              {user.firstName + " " + user.lastName}
            </label>
            <button
              className="btn btn-outline-info my-2 my-sm-0"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
