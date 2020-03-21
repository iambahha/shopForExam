import axiosApi from '../../axios-api';
import {push} from 'connected-react-router';
import {NotificationManager} from "react-notifications";

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER = 'LOGOUT_USER';

const registerUserSuccess = user => ({type: REGISTER_USER_SUCCESS, user});
const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, error});

const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});

export const logoutUser = () => async (dispatch, getState) => {
  try {
    const token = getState().users.user.token;
    const config = {headers: {'Authorization': token}};

    await axiosApi.delete('/users/session', config);
    NotificationManager.success('Logged out successfully');
    dispatch({type: LOGOUT_USER})
  } catch (e) {
    NotificationManager.error('Error');
    if (e.response) {
      dispatch(registerUserFailure(e.response.data))
    } else {
      dispatch(registerUserFailure({global: 'No connection'}))
    }
  }
};

export const registerUser = userData => async dispatch => {
  try {
    const response = axiosApi.post('/users', userData);
    NotificationManager.success('New User Registered');
    dispatch(registerUserSuccess(response.data.user));
    dispatch(push('/'));
  } catch (e) {
    NotificationManager.error('Missed some fields. Try again');
    if (e.response) {
      dispatch(registerUserFailure(e.response.data))
    } else {
      dispatch(registerUserFailure({global: 'No connection'}))
    }
  }
};

export const loginUser = userData => async dispatch => {
  try {
    const response = await axiosApi.post('users/sessions', userData);
    dispatch(loginUserSuccess(response.data.user));
    dispatch(push('/'));
  } catch (e) {
    if (e.response) {
      dispatch(loginUserFailure(e.response.data))
    } else {
      dispatch(loginUserFailure({global: 'No connection'}))
    }
  }
};