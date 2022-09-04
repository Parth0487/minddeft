import { useEffect, useState } from "react";
import { apiCall } from "../common/helper";
import Friend from "../components/Friend";

const Events = (props) => {
  const [users, setUsers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    getUsers();
    getSuggestions();

    setInterval(() => {
      getSuggestions()
    }, (60 * 1000));

  }, []);

  const getUsers = async () => {
    let response = await apiCall("GET", "getUsersWithoutMe", {}, {});

    if (response && response.success) {
      setUsers(response.data);
    } else {
      alert(response.message);
    }
  };

  const getSuggestions = async () => {
    let response = await apiCall("GET", "getSuggestions", {}, {});

    if (response && response.success) {
      setSuggestions(response.data);
    } else {
      alert(response.message);
    }
  };

  return (
    <div className="container p-2">
      <div className="mb-3">
        <h3>Suggestions</h3>
        <div className="row">
          {suggestions && suggestions.length ? (
            suggestions.map((item, index) => (
              <div className="col-3">
                <Friend data={item} />
              </div>
            ))
          ) : (
            <div className="col">No suggestions available</div>
          )}
        </div>
      </div>

      <hr />

      <div>
        <h3>Explore People</h3>
        <div className="users row">
          {users && users.length
            ? users.map((item, index) => (
                <div className="col-3">
                  <Friend data={item} />
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Events;
