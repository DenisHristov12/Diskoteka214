import styled from 'styled-components';
import { format } from 'date-fns';
import { formatDistanceFromNow } from '../../utils/helpers';
import { isToday } from 'date-fns';
import {
  respondToLandscapeTablets,
  respondToMobile,
  respondToMobileSmall,
} from '../../styles/mediaQueries';

const StyledBookingDataBox = styled.section`
  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${respondToLandscapeTablets(`
    font-size: 1.4rem;

    padding: 1.8rem 3.6rem;
  `)}

  ${respondToMobile(`
    flex-direction: column;

    row-gap: 2.4rem;
    justify-content: center;
    align-items: flex-start;

    padding: 1.4rem 3rem;
  `)}

  ${respondToMobileSmall(`
    font-size: 1rem;
  `)}
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;

  display: flex;
  flex-direction: column;
  gap: 3.6rem;

  ${respondToMobile(`
    font-size: 1rem;
  `)}
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }

  ${respondToMobile(`
    gap: 0.8rem;
    margin-bottom: 1.2rem;
  `)}
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;

  ${respondToMobile(`
    font-size: 1rem;
  `)}
`;

function BookingDataBox({ booking }) {
  const {
    created_at,
    reservators: { fullName: reservatorName, peopleNum, number },
    events: { name: eventName, date: eventDate },
  } = booking;

  return (
    <StyledBookingDataBox>
      <Header>
        <p>
          Made {format(new Date(created_at), 'EEE, MMM dd yyyy')} (
          {isToday(new Date(created_at))
            ? 'Today'
            : formatDistanceFromNow(created_at)}
          )
        </p>

        <p>
          For {eventName} on {format(new Date(eventDate), 'EEE, MMM dd yyyy')} (
          {isToday(new Date(eventDate))
            ? 'Today'
            : formatDistanceFromNow(eventDate)}
          )
        </p>
      </Header>

      <Section>
        <Guest>
          <p>
            {reservatorName} {peopleNum > 1 ? `+ ${peopleNum - 1} guests` : ''}
          </p>
          <span>&bull;</span>
          <p>{number}</p>
          <span>&bull;</span>
        </Guest>
      </Section>

      <Footer>
        <p>Booked {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;
