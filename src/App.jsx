import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Toaster } from 'react-hot-toast';

import GlobalStyles from './styles/GlobalStyles';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Users from './pages/Users';
import Account from './pages/Account';
import Login from './pages/Login';
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './ui/AppLayout';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Events from './pages/Events';
import Booking from './pages/Booking';
import Event from './pages/Event';
import Checkin from './pages/Checkin';
import ProtectedRoute from './ui/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Contacts from './pages/Contacts';
import { DarkModeProvider } from './context/DarkModeContext';
// import 'leaflet/dist/leaflet.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  const userData = JSON.parse(localStorage.getItem('user'));

  const isAdmin = userData?.roles?.roleName === 'admin';

  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                // <ProtectedRoute>
                <AppLayout />
                // </ProtectedRoute>
              }>
              <Route
                index
                element={
                  <Navigate replace to={isAdmin ? 'dashboard' : 'home'} />
                }
              />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='home' element={<Home />} />
              <Route path='about' element={<About />} />
              <Route path='contacts' element={<Contacts />} />
              <Route path='events' element={<Events />} />
              <Route path='events/:eventId' element={<Event />} />
              <Route path='bookings' element={<Bookings />} />
              <Route path='bookings/:bookingId' element={<Booking />} />
              <Route path='checkin/:bookingId' element={<Checkin />} />
              <Route path='users' element={<Users />} />
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='account' element={<Account />} />
            </Route>

            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position='top-center'
          gutter={12}
          containerStyle={{
            margin: '8px',
          }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: 'var(--color-grey-0)',
              color: 'var(--color-grey-700)',
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
