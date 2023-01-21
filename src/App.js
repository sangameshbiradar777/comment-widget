import './App.css';
import  {Provider}  from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Routes/Home';
import LogIn from './Routes/LogIn';
import Register from './Routes/Register';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/login' element={<LogIn />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
