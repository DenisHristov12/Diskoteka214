import styled from 'styled-components';
import {
  respondToLandscapeTablets,
  respondToMobileSmall,
  respondToSmallLaptop,
} from '../styles/mediaQueries';

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);

  ${respondToSmallLaptop(`
    font-size: 1.2rem;
  `)}

  ${respondToLandscapeTablets(`
    padding: 0.6rem 1rem;

    font-size: 1rem;
  `)}

  ${respondToMobileSmall(`
    font-size: 0.8rem;
  `)}
`;

export default Input;
