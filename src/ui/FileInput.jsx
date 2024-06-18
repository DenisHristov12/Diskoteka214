import styled from 'styled-components';
import {
  respondToLandscapeTablets,
  respondToMobileSmall,
  respondToSmallLaptop,
} from '../styles/mediaQueries';

const FileInput = styled.input.attrs({ type: 'file' })`
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;
    border-radius: var(--border-radius-sm);
    border: none;
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: var(--color-brand-700);
    }

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
  }
`;

export default FileInput;
