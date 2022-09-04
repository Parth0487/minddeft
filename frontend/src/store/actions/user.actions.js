import {SET_LOGIN, SET_USER} from '../actionTypes';

export const setLogin = (payload) => {

    console.log("In login action")

    return {
        type: SET_LOGIN,
        payload
    };

};


export const setUser = (payload) => {

    return {
        type: SET_USER,
        payload
    };

};
