import { configureStore } from '@reduxjs/toolkit';
import scrollReducer from './slices/scrollSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga/sagas';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const sagaMiddleware = createSagaMiddleware();

const reducers = {
  scroll: scrollReducer,
};

export const store = configureStore({
  reducer: reducers,
  middleware: [sagaMiddleware],
});

// Activate/run saga
sagaMiddleware.run(rootSaga);

export const action = (type: string) => store.dispatch({ type });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStateType = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

/**
 * It returns the dispatch function from the Redux store, but with a type that's specific to the app.
 * @returns {AppDispatch} The dispatch function for the app.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * It's a type assertion. It's saying that the `useSelector` function is of type
 * `TypedUseSelectorHook<RootStateType>`
 * @returns {TypedUseSelectorHook<RootStateType>} The current state of the application.
 */
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
