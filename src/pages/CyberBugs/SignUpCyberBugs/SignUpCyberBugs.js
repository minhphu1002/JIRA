import React from "react";
import { Button, Input } from "antd";
import {
  UserOutlined,
  LockOutlined,
  TwitterOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { singupCyberbugAction } from "../../../redux/actions/CyberBugsActions";
import { NavLink } from "react-router-dom";
function SignUpCyberBugs(props) {
  const { errors, handleChange, handleSubmit } = props;

  return (
    <form
      onSubmit={handleSubmit}
      className="container"
      style={{ height: window.innerHeight }}
    >
      F
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: window.innerHeight }}
      >
        <h3
          className="text-center"
          style={{ fontWeight: 700, fontSize: 35, color: "rgb(59, 89, 152)" }}
        >
          SIGN UP
        </h3>
        <div className="d-flex mt-3">
          <Input
            onChange={handleChange}
            style={{ width: "100%", minWidth: 300 }}
            name="email"
            size="large"
            placeholder=" email"
            prefix={<MailOutlined />}
          />
        </div>
        <div className="text-danger">{errors.email}</div>

        <div className="d-flex mt-3">
          <Input
            onChange={handleChange}
            style={{ width: "100%", minWidth: 300 }}
            name="name"
            size="large"
            placeholder=" name"
            prefix={<UserOutlined />}
          />
        </div>
        <div className="text-danger">{errors.name}</div>

        <div className="d-flex mt-3">
          <Input
            onChange={handleChange}
            style={{ width: "100%", minWidth: 300 }}
            name="phone"
            size="large"
            placeholder=" phone"
            prefix={<PhoneOutlined />}
          />
        </div>
        <div className="text-danger">{errors.phone}</div>

        <div className="d-flex mt-2">
          <Input
            onChange={handleChange}
            style={{ width: "100%", minWidth: 300 }}
            type="password"
            name="password"
            size="large"
            placeholder=" password"
            prefix={<LockOutlined />}
          />
        </div>
        <div className="text-danger">{errors.password}</div>

        <Button
          htmlType="submit"
          size="large"
          style={{
            minWidth: 300,
            backgroundColor: "rgb(102,117,223)",
            color: "#fff",
          }}
          className="mt-4"
        >
          Sign Up
        </Button>
        <span>
          Already have an account, login <NavLink to="/login">HERE</NavLink>
        </span>

        <div className="social mt-3 d-flex">
          <Button
            style={{ backgroundColor: "rgb(59,89,152)" }}
            shape="circle"
            size={"large"}
          >
            <span className="font-weight-bold" style={{ color: "#fff" }}>
              F
            </span>
          </Button>
          <Button
            type="primary ml-3"
            shape="circle"
            icon={<TwitterOutlined />}
            size={"large"}
          ></Button>
        </div>
      </div>
    </form>
  );
}

const SignUpCyberBugsWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: "",
    name: "",
    phone: "",
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email is required!")
      .email("email is invalid!"),
    password: Yup.string()
      .required("Email is required!")
      .min(6, "password must have min 6 characters")
      .max(32, "password have max 32 characters"),
    name: Yup.string()
      .min(3, "name must have min 3 characters")
      .required("Name is required!"),
    phone: Yup.number()
      .min(10, "phone must have min 10 numbers")
      .required("Phone Number is required!"),
  }),
  handleSubmit: (
    { email, password, name, phone },
    { props, setSubmitting }
  ) => {
    setSubmitting(true);
    props.dispatch(singupCyberbugAction(email, password, name, phone));
  },
  displayName: "SignUpCyberBugs",
})(SignUpCyberBugs);

export default connect()(SignUpCyberBugsWithFormik);
