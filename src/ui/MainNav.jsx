import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';

import {
  HiArrowRightOnRectangle,
  HiGift,
  HiInformationCircle,
  HiLockClosed,
  HiOutlineCalendarDays,
  HiOutlineHome,
  HiOutlineUsers,
  HiPhone,
} from 'react-icons/hi2';
import { respondToMobile, respondToSmallLaptop } from '../styles/mediaQueries';

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

  ${respondToSmallLaptop(`&:link,
  &:visited {
    font-size: 1.4rem;

    gap: 1rem;
  }
  
  & svg {
    width: 2.2rem;
    height: 2.2rem;
  }
  `)}

  ${respondToMobile(`&:link,
  &:visited {
    font-size: 1.2rem;

    gap: 0.8rem;
  }
  
  & svg {
    width: 2rem;
    height: 2rem;
  }
  `)}
`;

function MainNav({ closeSidebar }) {
  const { isUser, isAdmin } = useUser();

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
        <li>
          <StyledNavLink onClick={closeSidebar} to='/about'>
            <HiInformationCircle />
            About
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink onClick={closeSidebar} to='/contacts'>
            <HiPhone />
            Contacts
          </StyledNavLink>
        </li>
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
      </NavList>
    </nav>
  );
}

export default MainNav;
