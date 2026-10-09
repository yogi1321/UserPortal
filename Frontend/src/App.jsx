
import './App.css'
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import AdminDashboard from './Component/AdminDashboard';
import RolesDashboard from './Component/RolesDashboard';
import UserDashbaoard from './Component/UserDashbaoard';

function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AdminDashboard/>}/>
         <Route path='/roles' element={<RolesDashboard/>}/>
         <Route path='/user' element={<UserDashbaoard/>}/>

      </Routes>

    </BrowserRouter>
    </>
  )
}

export default App
