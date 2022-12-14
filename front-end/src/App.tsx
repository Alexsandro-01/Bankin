import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Notfound from './pages/Notfound';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Navigate to='/login' /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/Home' element={ <Home /> } />
        <Route path='*' element={ <Notfound /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
