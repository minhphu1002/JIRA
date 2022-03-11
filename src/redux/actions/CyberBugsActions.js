import {
  USER_SIGNIN_API,
  USER_SIGNUP_API,
} from "../constants/Cyberbugs/Cyberbugs";

export const singinCyberbugAction = (email, password) => {
  return {
    type: USER_SIGNIN_API,
    userLogin: {
      email: email,
      password: password,
    },
  };
};

export const singupCyberbugAction = (email, password, name, phone) => {
  return {
    type: USER_SIGNUP_API,
    userSignUp: {
      email: email,
      password: password,
      name: name,
      phone: phone,
    },
  };
};
