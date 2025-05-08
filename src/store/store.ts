// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import profileReducer from "./profileSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Использует localStorage по умолчанию

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["profile"], // Указываем, какие редьюсеры сохранять
};

const persistedProfileReducer = persistReducer(persistConfig, profileReducer);

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    profile: persistedProfileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/PURGE", "persist/REHYDRATE"],
      },
    }).concat(userApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;