import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import rootReducer from "./rootReducer";

// Configuración de redux-persist
const persistConfig = {
  key: "root",
  storage,
  // Puedes añadir una whitelist o blacklist si es necesario
  whitelist: ["cart"],
  // blacklist: ['someReducer'],
};

// Crear un persisted reducer combinando el rootReducer con persistConfig
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuración del store utilizando el persistedReducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

// Crear el persistor
const persistor = persistStore(store);

export { store, persistor };
