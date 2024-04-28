import styled from 'styled-components';

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 20rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src='logo10.svg' alt='Logo' />
    </StyledLogo>
  );
}

export default Logo;