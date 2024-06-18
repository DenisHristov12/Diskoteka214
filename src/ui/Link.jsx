import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { respondToMobile, respondToSmallLaptop } from '../styles/mediaQueries';

export const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: ${(props) => (props.logReg ? '0' : '1.2rem 2.4rem')};
    transition: all 0.3s;

    text-decoration: ${(props) => (props.logReg ? 'underline' : 'none')};
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
