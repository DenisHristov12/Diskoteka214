import styled from 'styled-components';
import { respondToMobile, respondToMobileSmall } from '../styles/mediaQueries';

export const LoginRegisterLayout = styled.main`
  height: ${(props) => (props.login ? '70vh' : '100vh')};
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);

  ${respondToMobile(`
    grid-template-columns: 28rem;
  `)}

  ${respondToMobileSmall(`
    grid-template-columns: 22rem;
  `)}
`;
