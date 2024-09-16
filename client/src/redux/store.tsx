
// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from './rootReducer'

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

export const persistConfig = {
  key: 'root-onward-crm-management',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: [thunk]
})

export const persistor = persistStore(store)