import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { apiCall } from "../common/helper";

const Requests = (props) => {
  const params = useParams();
  const [requests, setRequests] = useState({});

  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = async () => {
    let response = await apiCall("GET", "getRequests", {}, {});

    if (response && response.success) {
      setRequests(response.data);
    } else {
      alert(response.message);
    }
  };

  const updateRequest = async (id, status) => {
    let response = await apiCall("PUT", "updateRequest/" + id, { status }, {});

    if (response && response.success) {
      getRequests()
    } else {
      alert(response.message);
    }
  };

  return (
    <div className="container">
      <h3>Requests</h3>
      <div className="users row">
        {requests && requests.length ? (
          requests.map((item, index) => (
            <div className="request col-12 mb-3 border border-info" key={index}>
              <div className="d-flex justify-content-between">
                <div>
                  <p>
                    {item.user.firstName + " " + item.user.lastName} has sent
                    you a request
                  </p>
                </div>

                {item.status == 1 ? (
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-info mr-2"
                      onClick={() => updateRequest(item._id, 2)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-outline-info"
                      onClick={() => updateRequest(item._id, 3)}
                    >
                      Reject
                    </button>
                  </div>
                ) : item.status == 2 ? (
                  <label>Request Accepted</label>
                ) : (
                  <label>Request Rejected</label>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-secondary col">Yout request list is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Requests;
