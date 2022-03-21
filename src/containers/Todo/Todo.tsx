import {
  memo,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import styled, {css} from 'styled-components';
import {Container, Text} from '../../components';

export type ActionType = {
  type: string;
  payload: any;
};

export type TodoType = {id: number; text: string};
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
        {text: action?.payload || '', id: state.idCounter},
        ...state.todos,
      ];

      return {
        ...state,
        todos,
        idCounter: state.idCounter + 1,
      };
    }

    case 'deleteTodo': {
      const todos = state.todos.filter(
        item => item?.id !== action?.payload?.id,
      );

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

type TodoItemsType = Pick<StoreTodoType, 'todos'> & {
  onDelTodoItem: (id: number) => () => void;
};

const TodoItems = memo(({todos, onDelTodoItem}: TodoItemsType) => {
  console.log('Render: TodoItems');

  return (
    <>
      {todos?.map((item: TodoType) => (
        <div key={item?.id}>
          <TodoItem>{item.text}</TodoItem>
          <DelBtn onClick={onDelTodoItem(item.id)}>-</DelBtn>
        </div>
      ))}
    </>
  );
});

const useReducerWithMiddleware = (
  reducer: React.Reducer<any, any>,
  initValue: any,
  middlewareFns: Array<(action: ActionType, store?: any) => void>,
  afterwareFns: Array<(action: ActionType, store?: any) => void>,
) => {
  const [store, dispatch] = useReducer<React.Reducer<any, any>>(
    reducer,
    initValue,
  );

  const actionRef = useRef<ActionType>();

  const myDispatch: (action: ActionType) => void = useCallback(
    action => {
      // Applying my middlewareS
      middlewareFns.forEach(middleware => middleware(action, store));

      dispatch(action);

      // Saving our action for Afterwares
      actionRef.current = action;
    },
    [middlewareFns, store],
  );

  // Applying my afterwareS
  useEffect(() => {
    if (!actionRef?.current) {
      // If we don't have action => exit
      return;
    }

    afterwareFns.forEach(
      afterware => actionRef.current && afterware(actionRef.current, store),
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
  localStorage.setItem('todos', JSON.stringify({todos: store.todos}));
};

export const Todo = () => {
  console.log('Render: Todo');

  const [store, dispatch] = useReducerWithMiddleware(
    reducerTodo,
    getInitStoreTodo(),
    [loggerMiddleware],
    [saveToLocalStorageAfterware],
  );
  const [inputVal, setInputVal] = useState('');

  const onChangeInput = useCallback(e => setInputVal(e?.target?.value), []);

  const onAddTodoItem = useCallback(
    payload => {
      dispatch({type: 'addTodo', payload});
    },
    [dispatch],
  );

  const onDelTodoItem = useCallback(
    (id: number) => () => {
      dispatch({type: 'deleteTodo', payload: {id}});
    },
    [dispatch],
  );

  const onCleanInput = useCallback(() => setInputVal(''), []);

  const onInputKeyDown = useCallback(
    e => {
      switch (e?.key) {
        case 'Enter': {
          onAddTodoItem(inputVal);
          onCleanInput();
          break;
        }
      }
    },
    [onAddTodoItem, inputVal, onCleanInput],
  );

  return (
    <Container className={containerCss}>
      <Text isColumn variant="h5">
        Todo list (based on React.useReducer + custom Middlewares/Afterwares +
        localStorage):
      </Text>

      <Input
        value={inputVal}
        onChange={onChangeInput}
        onKeyDown={onInputKeyDown}
      />

      <TodoItems todos={store?.todos} onDelTodoItem={onDelTodoItem} />
    </Container>
  );
};

const containerCss = css`
  justify-content: flex-start;
  align-items: flex-start;
`;

const Input = styled.input`
  border: 0;
  border-bottom: 2px solid gray;
  border-left: 1px solid gray;
  font-size: 18px;
  margin: 1rem 0;

  &:hover {
    border-bottom: 2px solid green;
    border-left: 1px solid green;
  }
`;

const TodoItem = styled.div`
  display: inline-flex;
  margin: 0.5rem 1rem 0.5rem 0;
  border-bottom: 1px solid red;
`;

const DelBtn = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 1rem;
  width: 1rem;
  background-color: #00000020;
  border-radius: 50%;
  transition: all 0.3s;

  &:hover {
    border-radius: 30%;
    background-color: #00000040;
    cursor: pointer;
  }
`;
