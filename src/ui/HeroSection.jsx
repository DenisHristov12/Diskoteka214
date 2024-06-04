import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  background: ${({ backgroundImage }) => `url(${backgroundImage})`} no-repeat
    center center/cover;
  color: #fff;
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

function HeroSection({
  backgroundImage,
  title,
  subtitle,
  buttonText,
  buttonAction,
}) {
  const navigate = useNavigate();

  function handleClick() {
    if (buttonAction) {
      buttonAction();
    } else {
      navigate('/events');
    }
  }

  return (
    <HeroContainer backgroundImage={backgroundImage}>
      <HeroContent>
        {title && <HeroTitle>{title}</HeroTitle>}
        {subtitle && <HeroSubtitle>{subtitle}</HeroSubtitle>}
        {buttonText && (
          <HeroButton onClick={handleClick}>{buttonText}</HeroButton>
        )}
      </HeroContent>
    </HeroContainer>
  );
}

HeroSection.propTypes = {
  backgroundImage: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  buttonText: PropTypes.string,
  buttonAction: PropTypes.func,
};

HeroSection.defaultProps = {
  backgroundImage: 'party.jpg',
  title: 'Every event is insanely different',
  subtitle: 'Your best choice',
  buttonText: 'See upcoming events',
  buttonAction: null,
};

export default HeroSection;
