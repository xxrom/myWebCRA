//import { Main, TodoReduxPage, TodoUseReducerPage, UI } from "./pages";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './containers';

//[> A <Routes> looks through its children <Route>s and
//renders the first one that matches the current URL. */}
//<GlobalStyle />
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/*
          <Route index element={<Main />} />
          <Route path="new" element={<NewPage />} />
          <Route path="ui" element={<UI />} />
          <Route path="test0" element={<Test0 />} />
          */}
        </Route>
        {/*<Route path="/todo-use-reducer" element={<Layout />}>
          <Route index element={<TodoUseReducerPage />} />
        </Route>
        <Route path="/todo-redux" element={<Layout />}>
          <Route index element={<TodoReduxPage />} />
        </Route>
        */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

//const NewPage = () => {
//return (
//<div>
//<h1>new</h1>
//</div>
//);
//};
