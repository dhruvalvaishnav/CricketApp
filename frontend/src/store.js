import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  cricketerListReducer,
  cricketerDetailsReducer,
  cricketerDeleteReducer,
  cricketerCreateReducer,
  cricketerUpdateReducer,
} from "./reducers/cricketersReducers.js";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers.js";

const reducer = combineReducers({
  cricketerList: cricketerListReducer,
  cricketerDetails: cricketerDetailsReducer,
  cricketerDelete: cricketerDeleteReducer,
  cricketerCreate: cricketerCreateReducer,
  cricketerUpdate: cricketerUpdateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
