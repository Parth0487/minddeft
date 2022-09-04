import moment from "moment";
import { useReducer } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../common/helper";
import { setUser } from "../store/actions/user.actions";

const Friend = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const myFriends = useSelector((state) => state.user.user.friends);
  const sent = useSelector((state) => state.user.user.sent);

  console.log("myFriends", myFriends);

  const redirect = (id) => {
    navigate("/profile/" + id);
  };

  const sendRequest = async (id) => {
    let req = {
      to: id,
    };

    let response = await apiCall("POST", "sendRequest", req, {});

    if (response && response.success) {
      getProfile();

      alert("Friend request sent");
    } else {
      alert(response.message);
    }
  };

  const getProfile = async () => {
    let response = await apiCall("GET", "getProfile", {}, {});

    if (response && response.success) {
      dispatch(setUser(response.data));
    } else {
      alert(response.message);
    }
  };

  return (
    <div className="card mt-2 mb-2">
      <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
        className="card-img-top pointer"
        alt="..."
        onClick={() => redirect(data._id)}
      />
      <div className="card-body">
        <h5 className="card-title">{data.firstName + " " + data.lastName}</h5>
        <p className="card-text">{data.email}</p>

        {myFriends.includes(data._id) ? (
          <label className="text-grey"> In your friend list </label>
        ) : sent.includes(data._id) ? (
          <label className="text-grey"> Request sent </label>
        ) : (
          <div className="btn-group">
            <button
              className="btn btn-info"
              onClick={() => sendRequest(data._id)}
            >
              Send Request
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Friend;
