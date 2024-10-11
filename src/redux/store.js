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

// STORE 1
// import { configureStore } from '@reduxjs/toolkit'
// import rootReducer from "./rootReducer";

// const store = configureStore({
//   reducer: rootReducer
// })

// export default store

// STORE 2

// import { configureStore } from '@reduxjs/toolkit'

// import todosReducer from './features/todos/todosSlice'
// import filtersReducer from './features/filters/filtersSlice'

// const store = configureStore({
//   reducer: {
//     // Define a top-level state field named `todos`, handled by `todosReducer`
//     todos: todosReducer,
//     filters: filtersReducer
//   }
// })

// That one call to configureStore did all the work for us:
// It combined todosReducer and filtersReducer into the root reducer function, which will handle a root state that looks like {todos, filters}
// It created a Redux store using that root reducer
// It automatically added the thunk middleware
// It automatically added more middleware to check for common mistakes like accidentally mutating the state
// It automatically set up the Redux DevTools Extension connection

// export default store
