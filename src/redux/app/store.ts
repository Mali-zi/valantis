import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productReducer from '../store/productSlice';
import favouriteProductReducer from '../store/favouriteProductSlice';
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
  whitelist: ['favouriteProduct'],
};

const rootReducer = combineReducers({
  product: productReducer,
  favouriteProduct: favouriteProductReducer,
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
