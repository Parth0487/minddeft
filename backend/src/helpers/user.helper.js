let Users = require("../models/user.model");
let FriendRequest = require("../models/friendRequest.model");
let Suggestion = require("../models/suggestions.model");

const mongoose = require("mongoose");
ObjectId = mongoose.Types.ObjectId;

class Userhelper {
  async createUser(body) {
    let user = await Users.create({ ...body });
    return user.toJSON();
  }

  async findByEmail(email) {
    let data = await Users.findOne({ email });
    return data ? data.toJSON() : {};
  }

  async getUserById(_id) {
    let data = await Users.findOne({ _id });
    return data ? data.toJSON() : {};
  }

  async getUsers() {
    return await Users.find({});
  }

  async getUsersWithoutMe(_id) {
    return await Users.find({ _id: { $ne: _id } }).select([
      "email",
      "firstName",
      "lastName",
    ]);
  }

  async sendRequest(from, to) {
    return await FriendRequest.create({
      from: from,
      to: to,
      status: 1,
    });
  }

  async updateRequest(id, data) {
    return await FriendRequest.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
  }

  async addFriend(id1, id2) {
    await Users.findOneAndUpdate(
      { _id: id1 },
      {
        $push: {
          friends: id2,
        },
      }
    );

    await Users.findOneAndUpdate(
      { _id: id2 },
      {
        $push: {
          friends: id1,
        },
      }
    );
    return true;
  }

  async getFriends(_id, friends) {
    return await Users.find({ _id: { $in: friends } }).select({
      email: 1,
      firstName: 1,
      lastName: 1,
      friends: 1,
      _id: 1,
    });
  }

  // async getUsersForMe(_id) {
  //   return await Users.aggregate([
  //     {
  //       $match: {
  //         _id
  //       },
  //     },

  //     {
  //       $lookup: {
  //         from: "friendrequests",
  //         localField: "$_id",
  //         foreignField: ""
  //       }
  //     }
  //   ]);
  // }

  async getRequests(_id) {
    return await FriendRequest.aggregate([
      {
        $match: {
          to: ObjectId(_id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "from",
          foreignField: "_id",
          as: "user",
        },
      },

      {
        $sort: {
          createdAt: -1,
        },
      },

      {
        $project: {
          to: 1,
          from: 1,
          status: 1,
          _id: 1,
          user: { $first: "$user" },
        },
      },
    ]);
  }

  async getMutualFriends(friends1, friends2) {
    return await Users.find({
      $and: [
        {
          _id: {
            $in: friends1,
          },
        },
        {
          _id: {
            $in: friends2,
          },
        },
      ],
    });
  }

  async getSuggestions(arr) {
    return await Users.find({
      $and: [
        {
          _id: {
            $nin: arr,
          },
        },
      ],
    }).limit(2);
  }

  async getPendingRequest(_id) {
    let list = await FriendRequest.find(
      { from: ObjectId(_id) },
      { _id: 0, to: 1 }
    );
    return list && list.length ? list.map((i) => i.to) : [];
  }

  async getAlreadySuggestedUsers(_id) {
    let suggestedUser = await Suggestion.find({
      userId: ObjectId(_id),
    });

    if (suggestedUser && suggestedUser[0] && suggestedUser[0].suggested) {
      return suggestedUser[0].suggested;
    } else {
      return [];
    }
  }

  async addEntriesInSuggestion(_id, suggestions) {
    try {
      const start = new Date().toDateString();
      let arr = suggestions.map((i) => i._id);

      let res = await Suggestion.findOneAndUpdate(
        { userId: ObjectId(_id) },
        { $push: { suggested: { $each: arr } }, userId: ObjectId(_id) },
        { upsert: true }
      );

      console.log("DONE", res);

      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async removePreviousDaySuggestion(_id) {
    const now = new Date().getTime();
    let startOfDay = new Date(now - (now % 86400000));

    return await Suggestion.deleteMany({
      createdAt: {
        $lt: startOfDay,
      },
    });
  }
}

module.exports = new Userhelper();
