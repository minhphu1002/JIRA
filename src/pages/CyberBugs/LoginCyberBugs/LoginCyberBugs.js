import React from "react";
import { Button, Input } from "antd";
import { MailOutlined, LockOutlined, TwitterOutlined } from "@ant-design/icons";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { singinCyberbugAction } from "../../../redux/actions/CyberBugsActions";
import { NavLink } from "react-router-dom";
function LoginCyberBugs(props) {
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
          LOGIN
        </h3>
        <div className="d-flex mt-3">
          <Input
            onChange={handleChange}
            style={{ width: "100%", minWidth: 300 }}
            name="email"
            size="large"
            placeholder="email"
            prefix={<MailOutlined />}
          />
        </div>
        <div className="text-danger">{errors.email}</div>
        <div className="d-flex mt-3">
          <Input
            onChange={handleChange}
            style={{ width: "100%", minWidth: 300 }}
            type="password"
            name="password"
            size="large"
            placeholder="password"
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
          Login
        </Button>
        <span>Don't have an account, sign up <NavLink to="/signup">HERE</NavLink></span>

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

const LoginCyberBugsWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: "",
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email is required!")
      .email("email is invalid!"),
    password: Yup.string()
      .min(6, "password must have min 6 characters")
      .max(32, "password  have max 32 characters"),
  }),
  handleSubmit: ({ email, password }, { props, setSubmitting }) => {
    setSubmitting(true);
    props.dispatch(singinCyberbugAction(email, password));
  },
  displayName: "LoginCyberBugs",
})(LoginCyberBugs);

export default connect()(LoginCyberBugsWithFormik);
