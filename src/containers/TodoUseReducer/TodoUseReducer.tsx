import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { Todo } from '../../components';
import { TodoProps } from '../../components/Todo';

export type ActionType = {
  type: 'addTodo' | 'deleteTodo';
  payload: number | { [key: string]: number };
};

export type TodoType = { id: number; text: string };
export type StoreTodoType = {
  todos: Array<TodoType>;
  idCounter: number;
};

const getInitStoreTodo = (): StoreTodoType => {
  const localStorageTodos = localStorage.getItem('todos') || '{}';

  const todos = JSON.parse(localStorageTodos)?.todos || [];

  const maxId =
    todos?.reduce((acc: number, item: TodoType) => {
      if (item.id > acc) {
        return item.id;
      }

      return acc;
    }, 0) || 1;

  return {
    todos,
    idCounter: maxId + 1,
  };
};

const reducerTodo = (state: StoreTodoType, action: ActionType) => {
  switch (action?.type) {
    case 'addTodo': {
      const todos = [
        { text: action?.payload || '', id: state.idCounter },
        ...state.todos,
      ];

      return {
        ...state,
        todos,
        idCounter: state.idCounter + 1,
      };
    }

    case 'deleteTodo': {
      const actionId =
        typeof action?.payload !== 'number' ? action?.payload?.id : '';

      const todos = state.todos.filter((item) => item?.id !== actionId);

      return {
        ...state,
        todos,
      };
    }

    default: {
      return state;
    }
  }
};

const useReducerWithMiddleware = (
  reducer: React.Reducer<any, any>,
  initValue: any,
  middlewareFns: Array<(action: ActionType, store?: any) => void>,
  afterwareFns: Array<(action: ActionType, store?: any) => void>
) => {
  const [store, dispatch] = useReducer<React.Reducer<any, any>>(
    reducer,
    initValue
  );

  const actionRef = useRef<ActionType>();

  const myDispatch: (action: ActionType) => void = useCallback(
    (action) => {
      // Applying my middlewareS
      middlewareFns.forEach((middleware) => middleware(action, store));

      dispatch(action);

      // Saving our action for Afterwares
      actionRef.current = action;
    },
    [middlewareFns, store]
  );

  // Applying my afterwareS
  useEffect(() => {
    if (!actionRef?.current) {
      // If we don't have action => exit
      return;
    }

    afterwareFns.forEach(
      (afterware) => actionRef.current && afterware(actionRef.current, store)
    );

    // Removing actionRef to be sure that it will be empty
    actionRef.current = undefined;
  }, [afterwareFns, store]);

  return [store, myDispatch];
};

const loggerMiddleware = (action: ActionType, store: any) => {
  console.log('Logger Middleware: ', action, store);
};
const saveToLocalStorageAfterware = (action: ActionType, store: any) => {
  console.log('SaveToLocalStorage Afterware: ', action, store);
  localStorage.setItem('todos', JSON.stringify({ todos: store.todos }));
};

export const TodoUseReducer = () => {
  console.log('Render: TodoUseReucer');

  const [store, dispatch] = useReducerWithMiddleware(
    reducerTodo,
    getInitStoreTodo(),
    [loggerMiddleware],
    [saveToLocalStorageAfterware]
  );
  const todos = useMemo(() => store.todos, [store.todos]);

  const onAddTodoItem = useCallback(
    (payload) => {
      dispatch({ type: 'addTodo', payload });
    },
    [dispatch]
  );

  const onDelTodoItem: TodoProps['onDelTodoItem'] = useCallback(
    (id) => () => {
      dispatch({ type: 'deleteTodo', payload: { id } });
    },
    [dispatch]
  );

  return (
    <Todo
      title="Todo list (based on React.useReducer + custom Middlewares/Afterwares +
        localStorage):"
      todos={todos}
      onAddTodoItem={onAddTodoItem}
      onDelTodoItem={onDelTodoItem}
    />
  );
};
