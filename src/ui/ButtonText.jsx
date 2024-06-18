import styled from 'styled-components';
import { respondToMobile } from '../styles/mediaQueries';

const ButtonText = styled.button`
  color: var(--color-brand-600);
  font-weight: 500;
  text-align: center;
  transition: all 0.3s;
  background: none;
  border: none;
  border-radius: var(--border-radius-sm);

  &:hover,
  &:active {
    color: var(--color-brand-700);
  }

  ${respondToMobile(`
    font-size: 1.2rem;
  `)}
`;

export default ButtonText;
