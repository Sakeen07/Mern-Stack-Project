import axios from 'axios';
import {store} from './store'
import './App.css';
import MainPage from './components/mainpage/MainPage';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';


axios.defaults.baseURL = "http://localhost:3001"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
        <MainPage/>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
