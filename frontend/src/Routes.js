import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./views/Login";
import Register from "./views/Register";
import Feed from "./views/Feed";
import Profile from "./views/Profile";
import Friends from "./views/Friends";
import Requests from "./views/Requests";
import PageNotFound from "./views/PageNotFound";

import { useSelector } from "react-redux";


const AppRoutes = () => {
  const { isLoggedIn } = useSelector(((state) => state.user))

  return (

    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/requests" element={<Requests />} />
      <Route path="/profile/:id" element={<Profile />} />



      <Route path="*" element={<PageNotFound />} />

    </Routes>

  )
};

export default AppRoutes;
