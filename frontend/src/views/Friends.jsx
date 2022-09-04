import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { apiCall } from "../common/helper";
import Friend from "../components/Friend";

const Home = (props) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    getFriends();
  }, []);

  const getFriends = async () => {
    let response = await apiCall("GET", "getFriends", {}, {});

    if (response && response.success) {
      console.log(response.data);
      setFriends(response.data);
    } else {
      alert(response.message);
    }
  };

  return (
	<div className=" container">
	  <h3>Friends</h3>
	  <div className="users row">
		{friends && friends.length
		  ? friends.map((item, index) => (
			  <div className="col-3">
				<Friend data={item} index={index} />
			  </div>
			))
		  : <p className="text-secondary col">Yout friend list is empty.</p>}
	</div>
  </div>
  );
};

export default Home;
