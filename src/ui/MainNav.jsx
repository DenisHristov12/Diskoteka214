import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';

import {
  HiArrowRightOnRectangle,
  HiGift,
  HiInformationCircle,
  HiLockClosed,
  HiOutlineCalendarDays,
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineUsers,
  HiPhone,
} from 'react-icons/hi2';

import { useLogout } from '../features/authentication/useLogout';
import { StyledNavLink } from './Link';

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

function MainNav({ closeSidebar }) {
  const { isUser, isAdmin } = useUser();
  const { logout } = useLogout();

  function handleLogout() {
    closeSidebar();
    logout();
  }

  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink
            onClick={closeSidebar}
            to={isAdmin ? '/dashboard' : '/home'}>
            <HiOutlineHome /> Home
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink onClick={closeSidebar} to='/events'>
            <HiGift />
            Events
          </StyledNavLink>
        </li>
        {!isAdmin && (
          <li>
            <StyledNavLink onClick={closeSidebar} to='/about'>
              <HiInformationCircle />
              About
            </StyledNavLink>
          </li>
        )}
        {!isAdmin && (
          <li>
            <StyledNavLink onClick={closeSidebar} to='/contacts'>
              <HiPhone />
              Contacts
            </StyledNavLink>
          </li>
        )}
        {isAdmin && (
          <li>
            <StyledNavLink onClick={closeSidebar} to='/bookings'>
              <HiOutlineCalendarDays />
              Bookings
            </StyledNavLink>
          </li>
        )}
        {isAdmin && (
          <li>
            <StyledNavLink onClick={closeSidebar} to='/users'>
              <HiOutlineUsers />
              Users
            </StyledNavLink>
          </li>
        )}
        {!isUser && (
          <li>
            <StyledNavLink onClick={closeSidebar} to='/login'>
              <HiLockClosed />
              Login
            </StyledNavLink>
          </li>
        )}
        {!isUser && (
          <li>
            <StyledNavLink onClick={closeSidebar} to='/register'>
              <HiArrowRightOnRectangle />
              Register
            </StyledNavLink>
          </li>
        )}
        {isUser && (
          <li>
            <StyledNavLink onClick={closeSidebar} to='/account'>
              <HiOutlineUser />
              Account
            </StyledNavLink>
          </li>
        )}
        {isUser && (
          <li>
            <StyledNavLink onClick={handleLogout} to=''>
              <HiArrowRightOnRectangle />
              Logout
            </StyledNavLink>
          </li>
        )}
      </NavList>
    </nav>
  );
}

export default MainNav;
