import logo from './logo.svg';
import './App.css';
import {useCallback, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

const HomePage = () => {
  const [i, setI] = useState(0);

  const incI = useCallback(() => setI(i + 1), [i]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React tt
        </a>
        <div>{i}</div>
        <button onClick={incI}>click</button>
      </header>
    </div>
  );
};

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
          <Route path="/" element={<HomePage />} />
          <Route path="test" element={<TestPage />} />
          <Route path="new" element={<NewPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
