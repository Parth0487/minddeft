import { useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import "./App.scss";
import Navigation from "./components/Navigation";
import AppRoutes from "./Routes";
import { setLogin } from "./store/actions/user.actions";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let authToken = localStorage.getItem("AUTH_TOKEN");

    if (authToken) {
      dispatch(setLogin(true));
    }
  }, []);

  return (
    <div className="App">
      {props.isLoggedIn ? <Navigation /> : null}

      {/* <AppRoutes /> will include all the views of the web application */}

      <AppRoutes />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

export default connect(mapStateToProps, {})(App);
