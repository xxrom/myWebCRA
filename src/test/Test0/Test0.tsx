import React, {
  createContext,
  useEffect,
  useContext,
  useState,
  useCallback,
} from 'react';

//int: CoinMena 0

/* *
 * 1- create a menu component

 * - ul list with list items
 * - clicking on any item should highlight it and trigger the change event
 * - highlighting item will be based on the selected value passed to the  *
     "Menu" 
 * - we can use "renderHeader" prop to render custom header for the list
 *  <Menu 
      onChange={(value) => {}} 
      renderHeader 
      selectedValue={null}
    >
      <Item value={1} >
        content 1
      </Item>
      <Item value={2} >
        content 2
      </Item>
  * </Menu>

 * 2- create a hook 
     - that return a set of data with one of the api available in this url:
      https://jsonplaceholder.typicode.com.
     - data must be used to populate the menu.
     - after selecting a value from the menu, the hook will return that selected value (full object).
     - 
*/
const initValue = {
  selectedValue: null,
  onChange: () => {},
  rerenderHeader: () => {},
};

const MenuContext = createContext<any>(initValue);

const Menu = ({children, onChange, renderHeader, selectedValue}: any) => {
  const [Header, setHeader] = useState(renderHeader());

  const rerenderHeader = useCallback(
    text => {
      setHeader(renderHeader(text));
    },
    [renderHeader],
  );

  return (
    <MenuContext.Provider
      value={{
        selectedValue,
        onChange,
        rerenderHeader,
      }}>
      {Header}

      <div>{children}</div>
    </MenuContext.Provider>
  );
};

const useApi = (id: number | null) => {
  const [todo, setTodo] = useState<null | {title: string}>(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log('json', json);

        setTodo(json);
      });
  }, [setTodo, id]);

  return [todo];
};

type ItemProps = {
  value: null | number;
  children: React.ReactNode;
};

const Item = ({value, children}: ItemProps) => {
  const {onChange, selectedValue, rerenderHeader} = useContext(MenuContext);
  const [todo] = useApi(value);

  const onClickHandler = useCallback(() => {
    rerenderHeader(todo?.title);
    onChange(value);
  }, [rerenderHeader, onChange, value, todo?.title]);

  return (
    <div
      onClick={onClickHandler}
      style={{
        backgroundColor: selectedValue === value ? 'green' : 'blue',
      }}>
      {todo?.title || children}
    </div>
  );
};

const Header = (text = '') => {
  return <div>{`Header: ${text}`}</div>;
};

let render = 1;

const A = React.memo(() => {
  render++;

  return <div>{render}</div>;
});

export default function App() {
  const [selected, setSelected] = useState(null);

  return (
    <main>
      <A />

      <Menu
        renderHeader={Header}
        onChange={setSelected}
        selectedValue={selected}>
        <Item value={1}>content 1</Item>
        <Item value={2}>content 2</Item>
        <Item value={3}>content 3</Item>
        <Item value={4}>content 3</Item>
      </Menu>
    </main>
  );
}
