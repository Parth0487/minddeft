import { GET_EVENTS, SET_LOGIN, SET_USER } from "../actionTypes";

const initialState = {
  user: {
    firstName: "",
    lastName: "",
    email: "",
    friends: [],
    sent: [],
  },

  isLoggedIn: false,
};

const userReducer = (state = initialState, action) => {
  console.log(action);

  switch (action.type) {
    case GET_EVENTS: {
      return { ...state.events };
    }

    case SET_LOGIN: {
      state.isLoggedIn = action.payload;
      return { ...state };
    }

    case SET_USER: {
        state.user = action.payload;
        return { ...state };
      }

    default:
      return state;
  }
};

export default userReducer;
