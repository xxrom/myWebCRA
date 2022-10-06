import { memo, useCallback, useState } from 'react';
import { Text, Container } from '../components';
import { styled } from '@linaria/react';
import { css } from '@linaria/core';
import {
  StoreTodoType,
  TodoType,
} from '../containers/TodoUseReducer/TodoUseReducer';

type TodoItemsProps = Pick<TodoProps, 'todos' | 'onDelTodoItem'>;

export const TodoItems = memo(({ todos, onDelTodoItem }: TodoItemsProps) => {
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

export type TodoProps = Pick<StoreTodoType, 'todos'> & {
  title: string;
  onAddTodoItem: (val: string) => void;
  onDelTodoItem: (id: number) => () => void;
};

export const Todo = memo(
  ({ title, todos, onAddTodoItem, onDelTodoItem }: TodoProps) => {
    console.log('Render: Todo');

    const [inputVal, setInputVal] = useState('');

    const onDelete = useCallback(
      (id: number) => onDelTodoItem(id),
      [onDelTodoItem]
    );

    const onCleanInput = useCallback(() => setInputVal(''), [setInputVal]);

    const onInputKeyDown = useCallback(
      (e) => {
        switch (e?.key) {
          case 'Enter': {
            onAddTodoItem(inputVal);
            onCleanInput();
            break;
          }
        }
      },
      [onAddTodoItem, inputVal, onCleanInput]
    );
    const onChangeInput = useCallback(
      (e) => setInputVal(e?.target?.value),
      [setInputVal]
    );

    return (
      <Container className={containerCss}>
        <Text isColumn variant="h5">
          {title}
        </Text>

        <Input
          value={inputVal}
          onChange={onChangeInput}
          onKeyDown={onInputKeyDown}
        />

        <TodoItems todos={todos} onDelTodoItem={onDelete} />
      </Container>
    );
  }
);

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
