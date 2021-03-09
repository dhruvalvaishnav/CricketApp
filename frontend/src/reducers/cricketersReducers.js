import {
  CRICKETER_CREATE_FAIL,
  CRICKETER_CREATE_REQUEST,
  CRICKETER_CREATE_RESET,
  CRICKETER_CREATE_SUCCESS,
  CRICKETER_DELETE_FAIL,
  CRICKETER_DELETE_REQUEST,
  CRICKETER_DELETE_SUCCESS,
  CRICKETER_DETAILS_FAIL,
  CRICKETER_DETAILS_REQUEST,
  CRICKETER_DETAILS_SUCCESS,
  CRICKETER_LIST_FAIL,
  CRICKETER_LIST_REQUEST,
  CRICKETER_LIST_SUCCESS,
  CRICKETER_UPDATE_FAIL,
  CRICKETER_UPDATE_REQUEST,
  CRICKETER_UPDATE_RESET,
  CRICKETER_UPDATE_SUCCESS,
} from "../constants/cricketerConstansts";

export const cricketerListReducer = (state = { cricketers: [] }, action) => {
  switch (action.type) {
    case CRICKETER_LIST_REQUEST:
      return { loading: true, cricketers: [] };

    case CRICKETER_LIST_SUCCESS:
      return {
        loading: false,
        cricketers: action.payload.cricketers,
        pages: action.payload.pages,
        page: action.payload.page,
      };

    case CRICKETER_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const cricketerDetailsReducer = (state = { cricketers: {} }, action) => {
  switch (action.type) {
    case CRICKETER_DETAILS_REQUEST:
      return { loading: true, ...state };

    case CRICKETER_DETAILS_SUCCESS:
      return { loading: false, cricketers: action.payload };

    case CRICKETER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const cricketerDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CRICKETER_DELETE_REQUEST:
      return { loading: true };

    case CRICKETER_DELETE_SUCCESS:
      return { loading: false, success: true };

    case CRICKETER_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const cricketerCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CRICKETER_CREATE_REQUEST:
      return { loading: true };

    case CRICKETER_CREATE_SUCCESS:
      return { loading: false, success: true, cricketers: action.payload };

    case CRICKETER_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case CRICKETER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const cricketerUpdateReducer = (state = { cricketers: {} }, action) => {
  switch (action.type) {
    case CRICKETER_UPDATE_REQUEST:
      return { loading: true };

    case CRICKETER_UPDATE_SUCCESS:
      return { loading: false, success: true, cricketers: action.payload };

    case CRICKETER_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case CRICKETER_UPDATE_RESET:
      return { cricketers: {} };
    default:
      return state;
  }
};
