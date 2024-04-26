import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Settings from './pages/Settings';
import Users from './pages/Users';
import Account from './pages/Account';
import Login from './pages/Login';
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './ui/AppLayout';

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to='dashboard' />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='bookings' element={<Bookings />} />
            <Route path='users' element={<Users />} />
            <Route path='settings' element={<Settings />} />
            <Route path='account' element={<Account />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
