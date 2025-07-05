import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Layout/Navbar/Navbar';
import ClientInfo from './components/Layout/Pages/ClientInfo';
import Home from './components/Layout/Home/Home';
import Login from './components/Layout/Pages/Login';
import Registration from './components/Layout/Pages/Registration';

import ProtectedRoute from './Routes/ProtectedRoute';

function App() {
  return (
    <div className=''>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="show-client-info" element={<ClientInfo />} />
          {/* other authenticated routes */}
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;