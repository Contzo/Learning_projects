import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import accountReducer from "./features/account/accountSlice";
import customerReducer from "./features/customer/customerslice";

// root reducer
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// creating the store
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
