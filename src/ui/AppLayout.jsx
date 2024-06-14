import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import styled from 'styled-components';
import { useState } from 'react';
import {
  respondToBiggerTablets,
  respondToLandscapeTablets,
  respondToMobile,
} from '../styles/mediaQueries';

const StyledAppLayout = styled.div`
  display: grid;
  /* grid-template-columns: 26rem 1fr; */
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;

  ${respondToLandscapeTablets(`
    grid-template-columns: 22rem 1fr;
  `)}

  ${respondToMobile(`
    grid-template-columns: 18rem 1fr;
  `)}
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;

  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Container = styled.div`
  max-width: 150rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  const [isOpen, setIsOpen] = useState(false);

  // console.log(isOpen);

  const hideButton = isOpen;

  function setState() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <StyledAppLayout>
      <Header hideButton={hideButton} isOpen={isOpen} setIsOpen={setState} />
      <Sidebar isOpen={isOpen} setIsOpen={setState} />

      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
