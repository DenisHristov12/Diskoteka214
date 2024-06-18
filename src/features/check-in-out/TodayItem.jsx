import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Tag from '../../ui/Tag';
import Button from '../../ui/Button';
import CheckoutButton from './CheckoutButton';
import {
  respondToLandscapeTablets,
  respondToSmallLaptop,
} from '../../styles/mediaQueries';

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr 0.5fr 1fr;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }

  ${respondToLandscapeTablets(` grid-template-columns: 1fr 1fr;
  margin-bottom: 2.4rem;
  
  justify-items: center;
  `)}
`;

const Name = styled.div`
  font-weight: 500;

  font-size: 1.4rem;

  ${respondToSmallLaptop(`
    font-size: 1.2rem;
  `)}

  ${respondToLandscapeTablets(`
    grid-row: 1;
    grid-column: 1 / 2;
  `)}
`;

const Guests = styled.div`
  font-weight: 500;

  font-size: 1.4rem;

  ${respondToSmallLaptop(`
    font-size: 1.2rem;
  `)}

  ${respondToLandscapeTablets(`
    grid-row: 1;
    grid-column: 2 / -1;
    `)}
`;

function TodayItem({ activity }) {
  const { id, status, reservators } = activity;

  return (
    <StyledTodayItem>
      {status === 'checked-in' && <Tag type='green'>Coming</Tag>}
      {status === 'unconfirmed' && <Tag type='blue'>Unconfirmed</Tag>}

      <Name>{reservators.fullName}</Name>
      <Guests>
        {reservators.peopleNum} {reservators.peopleNum > 1 ? 'guests' : 'guest'}
      </Guests>

      {status === 'unconfirmed' && (
        <Button
          size='small'
          variation='primary'
          as={Link}
          to={`/checkin/${id}`}>
          Check in
        </Button>
      )}
      {status === 'checked-in' && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
