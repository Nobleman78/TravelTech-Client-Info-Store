import { Route,Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Layout/Navbar/Navbar'
import ClientInfo from './components/Layout/Pages/ClientInfo'
import Home from './components/Layout/Home/Home'
function App() {

  return (
    <div className=''>
      <Navbar />
      <Routes>
        <Route path = '/' element={<Home/>}></Route>
        <Route path='/show-client-info' element={<ClientInfo/>}></Route>
      </Routes>
    </div>
  )
}

export default App
