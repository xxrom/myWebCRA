import { configureStore } from '@reduxjs/toolkit';
import scrollReducer from './slices/scrollSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga/sagas';
//import messageReducer from "./slices/messageSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    scroll: scrollReducer,
    //message: messageReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export const action = (type: string) => store.dispatch({ type });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
