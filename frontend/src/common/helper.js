import axios from "axios";
import { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";


const API_BASE_URL = "http://localhost:4000/api/";

export const apiCall = async (method, url, reqData, params, header) => {
  return new Promise((resolve, reject) => {
    let headers;

    if (header) {
      headers = header;
    } else {
      headers = {
        language: "en",
        web_app_version: "1.0.0",
        Authorization: localStorage.getItem("AUTH_TOKEN"),
      };
    }

    axios({
      method: method,
      url: API_BASE_URL + url,
      data: reqData,
      params: params,
      headers: headers,
    })
      .then((response) => {
        let data = response.data;
        resolve(data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
    });
};

