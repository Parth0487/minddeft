import { setNestedObjectValues } from "formik";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { apiCall } from "../common/helper";
import Friend from "../components/Friend";
import { setUser } from "../store/actions/user.actions";

const Profile = (props) => {
  const params = useParams();
  const dispatch = useDispatch();

  const myFriends = useSelector((state) => state.user.user.friends);
  const sent = useSelector((state) => state.user.user.sent);

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [mutualFriends, setMutualFriends] = useState([]);

  useEffect(() => {
    getUserById();
    getMutualFriends();
  }, []);

  const getUserById = async () => {
    let response = await apiCall("GET", "getProfile?id=" + params.id, {}, {});

    if (response && response.success) {
      setUserDetails(response.data);    

    } else {
      alert(response.message);
    }
  };

  const getMutualFriends = async () => {
    let response = await apiCall(
      "GET",
      "getMutualFriends/" + params.id,
      {},
      {}
    );

    if (response && response.success) {
      setMutualFriends(response.data);
    } else {
      alert(response.message);
    }
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
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body text-center">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                alt="avatar"
                className="rounded-circle img-fluid"
              />
              <h5 className="my-3">{userDetails.firstName + " " + userDetails.lastName}</h5>
              <p className="text-muted mb-1">{userDetails.email}</p>
              <div className="d-flex justify-content-center mb-2">
                {myFriends.includes(params.id) ? (
                  <label className="text-grey"> In your friend list </label>
                ) : sent.includes(params.id) ? (
                  <label className="text-grey"> Request sent </label>
                ) : (
                  <div className="btn-group">
                    <button
                      className="btn btn-info"
                      onClick={() => sendRequest(params.id)}
                    >
                      Send Request
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Full Name</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">
                    {userDetails.firstName + " " + userDetails.lastName}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Email</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{userDetails.email}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Phone</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">+91 8586958785</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Address</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">Ahmedabad, Gujarat, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3>Mutual Friends</h3>
      <div className="users row">
        {mutualFriends && mutualFriends.length ? (
          mutualFriends.map((item, index) => (
            <div className="col-3">
              <Friend data={item} index={index} />
            </div>
          ))
        ) : (
          <p className="text-secondary col">
            You do not have any mutual friends.
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
