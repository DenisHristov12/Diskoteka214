import styled from 'styled-components';
import { format } from 'date-fns';
import { formatDistanceFromNow } from '../../utils/helpers';
import { isToday } from 'date-fns';

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
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;

  display: flex;
  flex-direction: column;
  gap: 3.6rem;
`;

// const ImageContainer = styled.div`
//   height: 20rem;
//   width: 100%;
// `;

// const EventImage = styled.img`
//   height: 100%;
//   width: auto;
// `;

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
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

function BookingDataBox({ booking }) {
  const {
    created_at,
    date,
    reservators: { fullName: reservatorName, peopleNum, number },
    events: { name: eventName, image, date: eventDate },
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
        {/* <ImageContainer>
          <EventImage src={image} />
        </ImageContainer> */}

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
