import {configureStore, combineReducers} from '@reduxjs/toolkit'
import userSlice from './UserSlice.jsx'
import messageSlice from './MessageSlice.jsx'
import socketSlice from './SocketSlice.jsx'
import {persistReducer,persistCombineReducers, PAUSE,REGISTER,REHYDRATE,FLUSH,PURGE,PERSIST} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    version:1,
    storage
  };
  

const rootReducers = combineReducers({
        user:userSlice,
        Mesa:messageSlice,
        Sockett:socketSlice,
})
 
const _persistedReducer = persistReducer(persistConfig, rootReducers);


export const store = configureStore({
    reducer: _persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
      // {
      //   /* ignore persistance actions */
      //   ignoredActions: [
      //     FLUSH,
      //     REHYDRATE,
      //     PAUSE,
      //     PERSIST,
      //     PURGE,
      //     REGISTER
      //   ],
      // },
    }),
  });
  
  export default store;