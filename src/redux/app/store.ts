import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productReducer from '../store/productSlice';
import favouriteUserReducer from '../store/favouriteUserSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from 'redux-persist';

const persistconfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['favouriteUsers'],
};

const rootReducer = combineReducers({
  product: productReducer,
  favouriteUsers: favouriteUserReducer,
});

const persistedreducer = persistReducer(persistconfig, rootReducer);

export const store = configureStore({
  reducer: persistedreducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
