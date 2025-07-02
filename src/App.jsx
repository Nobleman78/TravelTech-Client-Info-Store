import { Route,Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Layout/Navbar/Navbar'
import ClientInfo from './components/Layout/Pages/ClientInfo'
import Home from './components/Layout/Home/Home'
import Login from './components/Layout/Pages/Login'
import Registration from './components/Layout/Pages/Registration'
function App() {

  return (
    <div className=''>
      <Navbar />
      <Routes>
        <Route path = '/' element={<Home/>}></Route>
        <Route path='/show-client-info' element={<ClientInfo/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/registration' element={<Registration/>}></Route>
      </Routes>
    </div>
  )
}

export default App
