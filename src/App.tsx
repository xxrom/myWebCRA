import { Main, TodoReduxPage, TodoUseReducerPage, UI } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './containers';
import { memo } from 'react';
//import { useInView } from './hooks/useInView';

const App = memo(() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="ui" element={<UI />} />
          <Route path="ui2" element={<UI />} />
        </Route>
        <Route path="/todo-use-reducer" element={<Layout />}>
          <Route index element={<TodoUseReducerPage />} />
        </Route>
        <Route path="/todo-redux" element={<Layout />}>
          <Route index element={<TodoReduxPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
});

/*
* For generating all pages use: !!!
  <Text
    className={footerItemCss}
    variant="link-h5"
    onClick={onClickLink('ui')}
  >
    <Link to="/ui">UI</Link>
  </Text>
*/

export default App;
