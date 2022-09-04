import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import * as yup from "yup";
import { useFormik } from "formik";
import { apiCall } from "../common/helper";
import { useDispatch } from "react-redux";
import { setLogin } from "../store/actions/user.actions";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      firstName: yup.string().required("This field is required."),
      lastName: yup.string().required("This field is required."),
      email: yup
        .string()
        .email("Please enter a valid email")
        .required("This field is required."),
      password: yup.string().required("This field is required."),
    }),
    onSubmit: (values) => {
      register(values);
    },
  });

  const register = async (formValues) => {
    let response = await apiCall("POST", "register", formValues);

    if (response && response.success) {
      localStorage.setItem("AUTH_TOKEN", response.data.token);
      navigate("/feed");
      dispatch(setLogin(true));
    } else {
      alert(response.message);
    }
  };

  return (
    <div className="register">
      <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
        <div className="card card0 border-0">
          <div className="row d-flex">
            <div className="col-lg-7">
              <div className="row pl-5 justify-content-center mt-4 mb-4 border-line">
                <img
                  src="https://as2.ftcdn.net/v2/jpg/02/98/03/35/1000_F_298033558_2pBo7NiKr6oImondZwlZJoIrJEXsnX8g.jpg"
                  className="image"
                />
              </div>
            </div>
            <div className="col-lg-5">
              <div className="card2 card border-0 px-4 py-5">
                <h4>Create your account here.</h4>

                <div className="row px-3">
                  <label className="">
                    <h6 className="mb-0 text-sm">First Name</h6>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <span className="text-danger text-sm">
                      {formik.errors.firstName}
                    </span>
                  ) : null}
                </div>

                <div className="row px-3 mt-3">
                  <label className="">
                    <h6 className="mb-0 text-sm">Last Name</h6>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <span className="text-danger text-sm">
                      {formik.errors.lastName}
                    </span>
                  ) : null}
                </div>

                <div className="row px-3 mt-3">
                  <label className="">
                    <h6 className="mb-0 text-sm">Email Address</h6>
                  </label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter your email address"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <span className="text-danger text-sm">
                      {formik.errors.email}
                    </span>
                  ) : null}
                </div>

                <div className="row px-3 mt-3">
                  <label className="mb-1">
                    <h6 className="mb-0 text-sm">Password</h6>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <span className="text-danger text-sm">
                      {formik.errors.password}
                    </span>
                  ) : null}
                </div>

                <div className="row mt-2 mb-3 px-3">
                  <button
                    type="submit"
                    className="btn btn-success text-center"
                    onClick={formik.handleSubmit}
                  >
                    Register
                  </button>
                </div>
                <div className="row mb-4 px-3">
                  <small className="font-weight-bold">
                    Already have an account?
                    <Link className="text-success" to="/">
                      Login
                    </Link>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
