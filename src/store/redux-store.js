import UIReducer from "./redux-slices/UI-slice";
const { configureStore, combineReducers } = require("@reduxjs/toolkit");
import collectionReducer from "./redux-slices/ArtBoardSlice"
import userReducer from "./redux-slices/userSlice";
import collectorReducer from "./redux-slices/CollectorSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({ UI: UIReducer, collection: collectionReducer, user: userReducer, collector: collectorReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);