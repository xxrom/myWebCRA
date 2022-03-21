import {useCallback, useReducer, useState} from 'react';
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

const initStoreTodo: StoreTodoType = {
  todos: [
    {text: 'hello', id: 0},
    {text: 'test', id: 1},
  ],
  idCounter: 2,
};

const reducerTodo = (state: StoreTodoType, action: ActionType) => {
  console.log('ReducerTodo', action);

  switch (action?.type) {
    case 'add': {
      return {
        ...state,
        todos: [
          {text: action?.payload || '', id: state.idCounter},
          ...state.todos,
        ],
        idCounter: state.idCounter + 1,
      };
    }

    case 'del': {
      return {
        ...state,
        todos: state.todos.filter(item => item?.id !== action?.payload?.id),
      };
    }

    default: {
      console.log('default');
      return state;
    }
  }
};

export const Todo = () => {
  const [store, dispatch] = useReducer(reducerTodo, initStoreTodo);
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
      <div>
        <Text variant="h5">Todos:</Text>
      </div>

      <Input
        value={inputVal}
        onChange={onChangeInput}
        onKeyDown={onInputKeyDown}
      />

      {store?.todos?.map((item: TodoType) => (
        <div>
          <TodoItem key={item?.id}>{item.text}</TodoItem>
          <DelBtn onClick={onDelTodoItem(item.id)}>-</DelBtn>
        </div>
      ))}
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
