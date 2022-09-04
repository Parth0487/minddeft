var userHelper = require("../helpers/user.helper");
var authHelper = require("../utils/auth.middleware");

const responseHelper = require("../utils/response.helper");

class Users {
  async login(req, res) {
    try {
      console.log(req.body.email);
      let user = await userHelper.findByEmail(req.body.email);

      if (user && user._id) {
        if (user.password === req.body.password) {
          let token = await authHelper.createToken(user);
          responseHelper.success(res, "LOGIN_SUCCESS", { token });
        } else {
          throw "INCORRECT_EMAIL_PASSWORD";
        }
      } else {
        throw "INCORRECT_EMAIL_PASSWORD";
      }
    } catch (error) {
      console.log("ERROR: ", error);
      responseHelper.error(res, error, {});
    }
  }

  async register(req, res) {
    try {
      console.log("Heer");
      let existingUser = await userHelper.findByEmail(req.body.email);

      if (existingUser && existingUser._id) {
        throw "USER_WITH_SAME_EMAIL_EXISTS";
      } else {
        let user = await userHelper.createUser(req.body);
        let token = await authHelper.createToken(user);

        delete user["password"];

        responseHelper.success(res, "REGISTER_SUCCESS", { token, ...user });
      }
    } catch (error) {
      console.log("ERROR: ", error);
      responseHelper.error(res, error, {});
    }
  }

  async getUsersWithoutMe(req, res) {
    try {
      let users = await userHelper.getUsersWithoutMe(req.payload._id);

      responseHelper.success(res, "SUCCESS", users);
    } catch (error) {
      console.log("ERROR: ", error);
      responseHelper.error(res, error, {});
    }
  }

  async sendFriendRequest(req, res) {
    try {
      let request = await userHelper.sendRequest(req.payload._id, req.body.to);
      responseHelper.success(res, "FRIEND_REQUEST_SENT", request);
    } catch (error) {
      console.log("ERROR: ", error);
      responseHelper.error(res, error, {});
    }
  }

  async updateRequest(req, res) {
    try {
      let msg;
      let request = await userHelper.updateRequest(req.params.id, req.body);

      if (req.body.status == 2) {
        msg = "REQUEST_ACCEPT_SUCCESS";

        await userHelper.addFriend(request.to, request.from);
      }

      if (req.body.status == 3) {
        msg = "REQUEST_REJECT_SUCCESS";
      }

      responseHelper.success(res, msg, request);
    } catch (error) {
      console.log("ERROR: ", error);
      responseHelper.error(res, error, {});
    }
  }

  async getFriends(req, res) {
    try {
      let user = await userHelper.getUserById(req.payload._id);

      let friends = await userHelper.getFriends(req.payload._id, user.friends);

      responseHelper.success(res, "SUCCESS", friends);
    } catch (error) {
      console.log("ERROR: ", error);
      responseHelper.error(res, error, {});
    }
  }

  async getProfile(req, res) {
    try {
      let id = req.query.id ? req.query.id : req.payload._id;
      let user = await userHelper.getUserById(id);
      let sent = await userHelper.getPendingRequest(req.payload._id)
      responseHelper.success(res, "SUCCESS", {...user, sent});
    } catch (error) {
      console.log("ERROR: ", error);
      responseHelper.error(res, error, {});
    }
  }

  async getRequests(req, res) {
    try {
      let requests = await userHelper.getRequests(req.payload._id);
      responseHelper.success(res, "SUCCESS", requests);
    } catch (error) {
      console.log("ERROR: ", error);
      responseHelper.error(res, error, {});
    }
  }

  async getMutualFriends(req, res) {
    try {
      let user1 = await userHelper.getUserById(req.payload._id);
      let user2 = await userHelper.getUserById(req.params.id);

      let mutualFriends = await userHelper.getMutualFriends(user1.friends, user2.friends);

      responseHelper.success(res, "SUCCESS", mutualFriends);
    } catch (error) {
      console.log("ERROR: ", error);
      responseHelper.error(res, error, {});
    }
  }

  async getSuggestions(req, res) {
    try {

      await userHelper.removePreviousDaySuggestion(req.payload._id)

      let user = await userHelper.getUserById(req.payload._id);
      let requestedUsersArray = await userHelper.getPendingRequest(req.payload._id)
      let suggestedUsersArray = await userHelper.getAlreadySuggestedUsers(req.payload._id)

      console.log("suggestedUsersArray", suggestedUsersArray)

      console.log("requestedUsersArray", requestedUsersArray)

      let toNotConsider = [...user.friends, ...requestedUsersArray, ...suggestedUsersArray, req.payload._id]
      
      let suggestions = await userHelper.getSuggestions(toNotConsider);

      if (suggestions && suggestions.length) {
        await userHelper.addEntriesInSuggestion(req.payload._id, suggestions)
      }
      
      responseHelper.success(res, "SUCCESS", suggestions);
    } catch (error) {
      console.log("ERROR: ", error);
      responseHelper.error(res, error, {});
    }
  }

}

module.exports = new Users();
