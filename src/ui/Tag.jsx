import styled from 'styled-components';
import { respondToMobile } from '../styles/mediaQueries';

const Tag = styled.span`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);

  ${respondToMobile(`font-size: 0.8rem;`)}
`;

export default Tag;
