import { configureStore, combineReducers,} from "@reduxjs/toolkit";
import authReducer from "../api/authslice"
import myCartReducer from "../api/myOrderSlice"

const persistedState = localStorage.getItem("reduxState");
const initialState = persistedState ? JSON.parse(persistedState) : undefined;
const preloadedAuthState = initialState ? initialState.auth : undefined;

const myCartPersistedState = localStorage.getItem("myCartState");
const myCartInitialState = myCartPersistedState ? JSON.parse(myCartPersistedState) : undefined;
const preloadedMyCartState = myCartInitialState ? myCartInitialState.myCart : undefined;

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  myCart: myCartReducer
});

// Create the store
const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    auth: preloadedAuthState,
    myCart: preloadedMyCartState,
  },
});

// Subscribe to store changes and save auth state to local storage
store.subscribe(() => {
  const authState = store.getState().auth;
  const myCartState = store.getState().myCart
  const state = JSON.stringify({ auth: authState });
  localStorage.setItem("reduxState", state);

  const myCart = JSON.stringify({ myCart: myCartState });
  localStorage.setItem("myCartState", myCart);
});

// Add event listener to save auth state to local storage before page unload
window.addEventListener("beforeunload", () => {
  const authState = store.getState().auth;
  const state = JSON.stringify({ auth: authState });
  localStorage.setItem("reduxState", state);

  const myCartState = store.getState().myCart
  const myCart = JSON.stringify({ myCart: myCartState });
  localStorage.setItem("myCartState", myCart);
});

// Function to clear stored state
export const clearStoredState = () => {
  localStorage.removeItem("reduxState");
  localStorage.removeItem("myCartState");
};

export default store;
