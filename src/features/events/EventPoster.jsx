import styled from 'styled-components';

import Button from '../../ui/Button';

const Poster = styled.div`
  height: 50vh;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  box-shadow: var(--shadow-md);
  /* background-color: red; */
`;

const Img = styled.img`
  height: auto;
  width: 100%;
`;

function EventPoster({ event }) {
  return (
    <Poster>
      <Img src={event.image} alt='Poster' />

      <Button size='fullWidth'>See more</Button>
    </Poster>
  );
}

export default EventPoster;
