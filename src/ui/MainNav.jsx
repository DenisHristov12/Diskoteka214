import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import {
  HiArrowRightOnRectangle,
  HiGift,
  HiInformationCircle,
  HiLockClosed,
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineUsers,
  HiPhone,
} from 'react-icons/hi2';
import { useUser } from '../features/authentication/useUser';

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  const { isUser, isAdmin } = useUser();

  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to={isAdmin ? '/dashboard' : '/home'}>
            <HiOutlineHome /> Home
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/events'>
            <HiGift />
            Events
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/about'>
            <HiInformationCircle />
            About
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/contacts'>
            <HiPhone />
            Contacts
          </StyledNavLink>
        </li>
        {isAdmin && (
          <li>
            <StyledNavLink to='/bookings'>
              <HiOutlineCalendarDays />
              Bookings
            </StyledNavLink>
          </li>
        )}
        {isAdmin && (
          <li>
            <StyledNavLink to='/users'>
              <HiOutlineUsers />
              Users
            </StyledNavLink>
          </li>
        )}
        <li>
          <StyledNavLink to='/settings'>
            <HiOutlineCog6Tooth />
            Settings
          </StyledNavLink>
        </li>
        {!isUser && (
          <li>
            <StyledNavLink to='/login'>
              <HiLockClosed />
              Login
            </StyledNavLink>
          </li>
        )}
        {!isUser && (
          <li>
            <StyledNavLink to='/register'>
              <HiArrowRightOnRectangle />
              Register
            </StyledNavLink>
          </li>
        )}
      </NavList>
    </nav>
  );
}

export default MainNav;
