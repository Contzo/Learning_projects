import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { deposit } from "./features/account/accountSlice";
import { createCustomer } from "./features/customer/customerslice";
import store from "./store";

store.dispatch(createCustomer("Muila", "12345"));
store.dispatch(deposit(100));
console.log(store.getState());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
