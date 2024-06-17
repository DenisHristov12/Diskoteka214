import styled, { css } from 'styled-components';
import {
  respondToLandscapeTablets,
  respondToMobile,
  respondToMobileSmall,
} from '../styles/mediaQueries';

const Form = styled.form`
  ${(props) =>
    props.type === 'regular' &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);

      ${respondToMobile(`
        padding: 2rem 1rem;

        border: 0px solid var(--color-grey-100);
      `)}
    `}

  ${(props) =>
    props.type === 'modal' &&
    css`
      width: 100%;

      height: 80vh;

      overflow: scroll;
    `}
    
  overflow: scroll;
  font-size: 1.4rem;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Form;
