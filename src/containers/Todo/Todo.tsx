import {useCallback, useReducer, useState} from 'react';
import styled from 'styled-components';
import {Text} from '../../components';

export type ActionType = {
  type: string;
  payload?: any;
};
export type TodoType = string;
export type StoreTodoType = {
  todos: Array<TodoType>;
};

const initStoreTodo = {
  todos: ['hello', 'test'],
};

const reducerTodo = (state: StoreTodoType, action: ActionType) => {
  switch (action?.type) {
    case 'add': {
      console.log('add', action);

      return {
        ...state,
        todos: [action.payload, ...state.todos],
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

  const onChangeInput = useCallback(e => setInputVal(e?.target?.value), [
    setInputVal,
  ]);

  const onAddTodoItem = useCallback(
    payload => {
      dispatch({type: 'add', payload});
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
    [onAddTodoItem, onCleanInput, inputVal],
  );

  return (
    <div>
      <Text variant="h5">Todo</Text>
      <Input
        value={inputVal}
        onChange={onChangeInput}
        onKeyDown={onInputKeyDown}
      />

      {store?.todos?.map((item: TodoType, index) => (
        <TodoItem key={index}>{item}</TodoItem>
      ))}
    </div>
  );
};

const Input = styled.input`
  border: 1px solid green;
`;
const TodoItem = styled.div`
  padding: 0.5rem 1rem;
  border: 1px solid red;
`;
