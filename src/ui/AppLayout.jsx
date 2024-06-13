import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import styled from 'styled-components';
import { useState } from 'react';

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;

  grid-column: ${({ isOpen }) => (isOpen ? '1 / -1' : '2 / -1')};

  overflow: scroll;

  /* background-color: red; */

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Container = styled.div`
  max-width: 150rem;
  margin: ${({ isOpen }) => (!isOpen ? '0 auto' : '0')};
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  const [isOpen, setIsOpen] = useState(false);

  function setState() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <StyledAppLayout>
      <Header isOpen={isOpen} setIsOpen={setState} />
      <Sidebar isOpen={isOpen} setIsOpen={setState} />

      <Main isOpen={isOpen}>
        <Container isOpen={isOpen}>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
