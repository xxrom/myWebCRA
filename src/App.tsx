//import logo from './logo.svg';
//import './App.css';
import {Main} from './pages';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

const TestPage = () => {
  return (
    <div>
      <h1>test</h1>
    </div>
  );
};

const NewPage = () => {
  return (
    <div>
      <h1>new</h1>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/test">TEST</Link>
            </li>
            <li>
              <Link to="/new">NEW</Link>
            </li>
          </ul>
        </nav>

        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="test" element={<TestPage />} />
          <Route path="new" element={<NewPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
