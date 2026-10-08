
import './App.css'
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import AdminDashboard from './Component/AdminDashboard';
import RolesDashboard from './Component/RolesDashboard';

function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AdminDashboard/>}/>
         <Route path='/roles' element={<RolesDashboard/>}/>

      </Routes>

    </BrowserRouter>
    </>
  )
}

export default App
