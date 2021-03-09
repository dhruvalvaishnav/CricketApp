import axios from "axios";
import {
  CRICKETER_LIST_REQUEST,
  CRICKETER_LIST_SUCCESS,
  CRICKETER_LIST_FAIL,
  CRICKETER_DETAILS_REQUEST,
  CRICKETER_DETAILS_SUCCESS,
  CRICKETER_DETAILS_FAIL,
  CRICKETER_DELETE_REQUEST,
  CRICKETER_DELETE_SUCCESS,
  CRICKETER_DELETE_FAIL,
  CRICKETER_CREATE_SUCCESS,
  CRICKETER_CREATE_FAIL,
  CRICKETER_CREATE_REQUEST,
  CRICKETER_UPDATE_REQUEST,
  CRICKETER_UPDATE_SUCCESS,
  CRICKETER_UPDATE_FAIL,
} from "../constants/cricketerConstansts.js";

export const listCricketers = (keyword = "", pageNumber = "") => async (
  dispatch
) => {
  try {
    dispatch({ type: CRICKETER_LIST_REQUEST });

    const { data } = await axios.get(
      `/api/cricketers?keyword=${keyword}&pageNumber=${pageNumber}`
    );

    dispatch({ type: CRICKETER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CRICKETER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCricketersDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CRICKETER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/cricketers/${id}`);

    dispatch({ type: CRICKETER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CRICKETER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCricketer = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CRICKETER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/cricketers/${id}`, config);

    dispatch({
      type: CRICKETER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CRICKETER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCricketer = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CRICKETER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/cricketers`, {}, config);

    dispatch({
      type: CRICKETER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CRICKETER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCricketer = (cricketer) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CRICKETER_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/cricketers/${cricketer._id}`,
      cricketer,
      config
    );

    dispatch({
      type: CRICKETER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CRICKETER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
