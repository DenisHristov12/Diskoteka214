import styled from 'styled-components';
import {
  respondToLandscapeTablets,
  respondToSmallLaptop,
} from '../../styles/mediaQueries';

const StyledStat = styled.div`
  background-color: var(--color-grey-0);
  padding: 1.6rem;
  display: grid;
  grid-template-columns: 6.4rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.6rem;
  row-gap: 0.4rem;

  ${respondToSmallLaptop(`
    padding: 1.2rem;

    grid-template-columns: 5.4rem 1fr;
  `)}

  ${respondToLandscapeTablets(`
  padding: 1.2rem;

    grid-template-columns: 5rem 1fr;

  `)}
`;

const Icon = styled.div`
  grid-row: 1 / -1;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--color-${(props) => props.color}-100);

  ${respondToLandscapeTablets(`
    aspect-ratio: 1;
  `)}

  & svg {
    width: 3.2rem;
    height: 3.2rem;
    color: var(--color-${(props) => props.color}-700);

    ${respondToSmallLaptop(`
    width: 3rem;
    height: 3rem;
      `)}

    ${respondToLandscapeTablets(`
    width: 2.6rem;
    height: 2.6rem;
      `)}
  }
`;

const Title = styled.h5`
  align-self: end;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-500);

  ${respondToLandscapeTablets(`
    font-size: 0.8rem;
  `)}
`;

const Value = styled.p`
  font-size: 2.4rem;
  line-height: 1;
  font-weight: 500;

  ${respondToSmallLaptop(`
    font-size: 2.2rem;
  `)}

  ${respondToLandscapeTablets(`
    font-size: 1.6rem;
  `)}
`;

function Stat({ icon, title, value, color }) {
  return (
    <StyledStat>
      <Icon color={color}>{icon}</Icon>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </StyledStat>
  );
}

export default Stat;
