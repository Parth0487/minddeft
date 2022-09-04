const messages = require("./messages.json");

class ResponseHelper {
  error(res, msg, data) {
    let response = {
      success: false,
      status: "FAIL",
      message: messages[msg],
      data: {}
    };
    let status_code = 200;
    if (msg == "USER_DELETED" || msg == "USER_BLOCKED") {
      response.code = 403;
      status_code = 403;
    }
    if (msg == "USER_NOT_VERIFIED" || msg == "UPDATE_PHONE_SMS_SUCCESS") {
      response.code = 2;
      response.data = data;
    }
    if (msg == "TOKEN_EXPIRED") {
      response.code = 401;
      status_code = 401;
    }

    res.status(status_code).json(response);
  }

  success(res, msg, data) {
    let response = {
      success: true,
      status: "SUCCESS",
      message: messages[msg],
      data: data,
    };

    res.status(200).json(response);
  }

}

module.exports = new ResponseHelper();
