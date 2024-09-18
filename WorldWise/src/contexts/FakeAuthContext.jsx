import { createContext, useContext, useReducer } from "react";

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
const AuthContext = createContext();
const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "loggedIn":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "loggedOut":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("No action recognized");
  }
}
/* eslint-disable react/prop-types */
function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    // check the user
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "loggedIn", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "loggedOut" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const value = useContext(AuthContext);
  if (value === undefined)
    throw new Error("This context was used outside the Auth provider");
  return value;
}

export { AuthProvider, useAuth };
