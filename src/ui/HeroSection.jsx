import styled from 'styled-components';
import backgroundImage from '../../public/party.jpg';
import { useNavigate } from 'react-router-dom';

const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  background: url(${backgroundImage}) no-repeat center center/cover;
  color: white;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 60rem;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 1rem;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.6rem;
  margin-bottom: 4rem;
`;

const HeroButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  color: #fff;
  background-color: #ff7f50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ff6347;
  }
`;

//   HERO IMAGE HEADER
/* 
    Every event in insanely different
            Your best choice
           See upcoming events
   */
function HeroSection() {
  const navigate = useNavigate();

  return (
    <HeroContainer>
      <HeroContent>
        <HeroTitle>Every event in insanely different</HeroTitle>
        <HeroSubtitle>Your best choice</HeroSubtitle>
        <HeroButton onClick={() => navigate('/events')}>
          See upcoming events
        </HeroButton>
      </HeroContent>
    </HeroContainer>
  );
}

export default HeroSection;
