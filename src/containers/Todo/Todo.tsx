import {memo, useCallback, useReducer, useState} from 'react';
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

  const todos = JSON.parse(localStorageTodos)?.todos;

  const maxId =
    todos?.reduce((acc: number, item: TodoType) => {
      if (item.id > acc) {
        return item.id;
      }

      return acc;
    }, 0) || 2;

  return {
    todos: todos
      ? todos
      : [
          {text: 'todo item 0', id: 0},
          {text: 'item 1', id: 1},
        ],
    idCounter: maxId,
  };
};

const reducerTodo = (state: StoreTodoType, action: ActionType) => {
  console.log('ReducerTodo', action, state);

  switch (action?.type) {
    case 'add': {
      const todos = [
        {text: action?.payload || '', id: state.idCounter},
        ...state.todos,
      ];

      localStorage.setItem('todos', JSON.stringify({todos}));

      return {
        ...state,
        todos,
        idCounter: state.idCounter + 1,
      };
    }

    case 'del': {
      const todos = state.todos.filter(
        item => item?.id !== action?.payload?.id,
      );

      localStorage.setItem('todos', JSON.stringify({todos}));
      return {
        ...state,
        todos,
      };
    }

    default: {
      console.log('default');
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

export const Todo = () => {
  console.log('Render: Todo');

  const [store, dispatch] = useReducer(reducerTodo, getInitStoreTodo());
  const [inputVal, setInputVal] = useState('');

  const onChangeInput = useCallback(e => setInputVal(e?.target?.value), []);

  const onAddTodoItem = useCallback(payload => {
    dispatch({type: 'add', payload});
  }, []);

  const onDelTodoItem = useCallback(
    (id: number) => () => {
      dispatch({type: 'del', payload: {id}});
    },
    [],
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
        Todo list (based on React.useReducer):
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
