import styled from 'styled-components';
import { useDarkMode } from '../context/DarkModeContext';
import { respondToSmallLaptop } from '../styles/mediaQueries';

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 20rem;
  width: auto;

  ${respondToSmallLaptop(`
    height: 18rem;
  `)}
`;

function Logo() {
  const { isDarkMode } = useDarkMode();

  const src = isDarkMode ? 'logoDark.png' : 'logo10.svg';

  return (
    <StyledLogo>
      <Img src={src} alt='Logo' />
    </StyledLogo>
  );
}

export default Logo;
