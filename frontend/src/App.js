import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage'
import ForgetPage from './components/ForgetPage'
import MainPage from './components/MainPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  
  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<HomePage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/forget-pass" element={<ForgetPage />} />
        <Route path="/Main-Page" element={< MainPage />} />
        </Routes>
        </BrowserRouter>
     
    </div>
  );
}

export default App;
