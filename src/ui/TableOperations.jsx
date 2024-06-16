import styled from 'styled-components';
import { respondToMobile } from '../styles/mediaQueries';

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  ${respondToMobile(`flex-direction: column;
  align-items: flex-start;
  `)}
`;

export default TableOperations;
