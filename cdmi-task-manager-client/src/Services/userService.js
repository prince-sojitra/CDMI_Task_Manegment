import Cookies from "js-cookie";
import axios from "axios";
import {
  loginStart,
  logout,
  loginFailure,
  loginSuccess,
  loadSuccess,
  loadFailure,
  loadStart,
  fetchingStart,
  fetchingFinish,
} from "../Redux/Slices/userSlice";
import { openAlert } from "../Redux/Slices/alertSlice";
import setBearer from "../Utils/setBearer";
const baseUrl = `${process.env.REACT_APP_APIURL}/user/`;

export const getToken = async () => {
  let localToken = localStorage.getItem("token");
  let cookieToken = Cookies.get("token")
  if (localToken != cookieToken) {
    return false
  }

  return localToken
};

export const setUserToken = async (user) => {
  localStorage.setItem("token", user.token);
  localStorage.setItem("user", JSON.stringify(user));
  Cookies.set("token", user.token)
  Cookies.set("user", JSON.stringify(user))
};


export const register = async (
  values,
) => {
  try {
    const res = await axios.post(`${baseUrl}register`, values);
    openAlert({
      message: res.data.message,
      severity: "success",
      duration: 1500,
    })
  } catch (error) {
    openAlert({
      message: error?.response?.data?.message
        ? error.response.data.message
        : error.message,
      severity: "error",
    })
  }
};

export const login = async ({ email, password }, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(baseUrl + "login", { email, password });
    const { user, message } = res.data;
    setUserToken(user)
    setBearer(user.token);
    dispatch(loginSuccess({ user }));
    dispatch(
      openAlert({
        message,
        severity: "success",
        duration: 500,
        nextRoute: "/boards",
      })
    );
  } catch (error) {
    dispatch(loginFailure());
    dispatch(
      openAlert({
        message: error?.response?.data?.message
          ? error.response.data.message
          : error.message,
        severity: "error",
      })
    );
  }
};

export const loadUser = async (dispatch) => {
  dispatch(loadStart());
  if (!await getToken()) {
    dispatch(loadFailure())
    return dispatch(logout())
  };
  setBearer(localStorage.token);
  try {
    const res = await axios.get(baseUrl + "get-user");
    dispatch(loadSuccess({ user: res.data }));
  } catch (error) {
    dispatch(loadFailure());
  }
};

export const getUserFromEmail = async (email, dispatch) => {
  dispatch(fetchingStart());
  if (!email) {
    dispatch(
      openAlert({
        message: "Please write an email to invite",
        severity: "warning",
      })
    );
    dispatch(fetchingFinish());
    return null;
  }

  try {
    const res = await axios.post(baseUrl + "get-user-with-email", { email });
    dispatch(fetchingFinish());
    return res.data;
  } catch (error) {
    dispatch(
      openAlert({
        message: error?.response?.data?.message
          ? error.response.data.message
          : error.message,
        severity: "error",
      })
    );
    dispatch(fetchingFinish());
    return null;
  }
};
