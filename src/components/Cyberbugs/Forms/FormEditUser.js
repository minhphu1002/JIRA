import { withFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import * as Yup from "yup";
import { EDIT_USER_SAGA } from "../../../redux/constants/Cyberbugs/Cyberbugs";
import {  SET_SUBMIT_EDIT_USER } from "../../../redux/constants/DrawerCons";

function FormEditUser(props) {
  const dispatch = useDispatch();
  const { values, handleChange, handleSubmit } = props;

  useEffect(() => {
    dispatch({ type: SET_SUBMIT_EDIT_USER, submitFunction: handleSubmit });
  }, [dispatch, handleSubmit]);

  return (
    <form className="container-fuild" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <p className="font-weight-bold">User id</p>
            <input
              value={values.id}
              disabled
              className="form-control"
              name="id"
            />
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <p className="font-weight-bold">Phone Number</p>
            <input
              onChange={handleChange}
              value={values.phoneNumber}
              className="form-control"
              name="phoneNumber"
            />
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">User Name</p>
            <input
              onChange={handleChange}
              value={values.name}
              className="form-control"
              name="name"
            />
          </div>
        </div>

        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Email</p>
            <input
              onChange={handleChange}
              value={values.email}
              className="form-control"
              name="email"
            />
          </div>
        </div>
      </div>
    </form>
  );
}

const editUserForm = withFormik({
  enableReinitialize: true,

  mapPropsToValues: (props) => {
    const { userEdit } = props;

    return {
      id: userEdit.userId,
      email: userEdit.email,
      name: userEdit.name,
      phoneNumber: userEdit.phoneNumber,
    };
  },
  validationSchema: Yup.object().shape({
    // email: Yup.string()
    //   .required("Email is required!")
    //   .email("email is invalid!"),
    // name: Yup.string()
    //   .min(3, "name must have min 3 characters")
    //   .required("Name is required!"),
    // phoneNumber: Yup.number()
    //   .min(10, "phone must have min 10 numbers")
    //   .required("Phone Number is required!"),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: EDIT_USER_SAGA,
      userEdit: values,
    });
  },
  displayName: "EditUser",
})(FormEditUser);

const mapStateToProps = (state) => ({
  userEdit: state.UserLoginCyberBugsReducer.userEdit,
});

export default connect(mapStateToProps)(editUserForm);
