//import logo from './logo.svg';
//import './App.css';
import {Main, TodoReduxPage, TodoUseReducerPage, UI} from './pages';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Layout} from './containers';
import {createGlobalStyle} from 'styled-components';
import {Test0} from './test/';

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="new" element={<NewPage />} />
          <Route path="ui" element={<UI />} />

          <Route path="test0" element={<Test0 />} />
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
};

export default App;

const NewPage = () => {
  return (
    <div>
      <h1>new</h1>
    </div>
  );
};

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    position: relative;
    margin: 0;
    background: #efefef0f;
  }
`;
