// import { createStore, applyMiddleware, compose } from "redux";
// import rootReducer from "./reducer";
// import { thunk } from "redux-thunk";

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

// export default store;

// store.js
import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { thunk } from "redux-thunk";
import rootReducer from "./reducer";

const persistConfig = {
  key: "root",
  storage,
  //   whitelist: ["auth"], // Solo persiste el reducer de autenticación (auth)
  blacklist: ["search"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(thunk))
);
const persistor = persistStore(store);

export { store, persistor };
