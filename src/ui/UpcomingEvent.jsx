import styled from 'styled-components';
import Button from './Button';

const EventContainer = styled.div`
  display: flex;
  gap: 4.8rem;

  align-items: center;
  /* justify-content: space-between; */
  /* background-color: blue; */

  & button {
    margin-left: 15rem;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: -5.3rem;
      left: -10rem;
      background-color: transparent;
      width: 1px;
      height: 15rem;
      background-color: var(--color-grey-200);
    }
  }
`;

const Image = styled.img`
  height: 15rem;
  width: auto;
`;

const DataContainer = styled.div`
  height: 15rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  justify-content: flex-start;

  /* background-color: red; */
`;

const Name = styled.p`
  margin-bottom: 1.2rem;
  font-size: 2.4rem;
  font-weight: 600;
  text-transform: capitalize;
`;
const Date = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-transform: capitalize;
`;
const Entrance = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
`;

const Span = styled.span`
  font-weight: 600;
`;

function UpcomingEvent({ event }) {
  const { image, name, date, entrance } = event;

  return (
    <EventContainer>
      <Image src={image} />
      <DataContainer>
        <Name>{name}</Name>
        <Date>
          <Span>Date: </Span>
          {date}
        </Date>
        <Entrance>
          <Span>Entrance: </Span> {entrance}
        </Entrance>
      </DataContainer>
      <DataContainer>For you</DataContainer>
      <DataContainer>Promotions</DataContainer>
      <DataContainer>Description</DataContainer>
      <DataContainer>Places Left</DataContainer>
      <Button>Reserve</Button>
    </EventContainer>
  );
}

export default UpcomingEvent;
