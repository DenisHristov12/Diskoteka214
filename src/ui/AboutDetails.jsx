import styled from 'styled-components';
import {
  respondToLandscapeTablets,
  respondToMobile,
  respondToMobileSmall,
  respondToSmallLaptop,
} from '../styles/mediaQueries';

const AboutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 5rem;
  background-color: var(--color-grey-0);
  color: var(--color-grey-900);
  text-align: left;

  ${respondToLandscapeTablets(`
    flex-direction: column;
  `)}
`;

const AboutContent = styled.div`
  max-width: 60rem;
  padding: 2rem;

  ${respondToMobileSmall(`
    padding: 2rem 0rem;
  `)}
`;

const AboutImage = styled.img`
  width: 100%;
  max-width: 40rem;
  border-radius: 10px;
  margin-right: 2rem;
`;

const AboutTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 2rem;

  ${respondToSmallLaptop(`
    font-size: 2.6rem;
  `)}

  ${respondToMobile(`
    font-size: 2rem;
  `)}

  ${respondToMobileSmall(`
    font-size: 1.4rem;
  `)}
`;

const AboutText = styled.p`
  font-size: 1.8rem;
  line-height: 1.6;

  ${respondToSmallLaptop(`
    font-size: 1.6rem;
  `)}

  ${respondToMobile(`
    font-size: 1.4rem;

    line-height: 1.4;
  `)}

  ${respondToMobile(`
    font-size: 1rem;
  `)}
`;

function AboutDetails() {
  return (
    <AboutContainer>
      <AboutImage src='party3.jpg' alt='About Us' />
      <AboutContent>
        <AboutTitle>What we do</AboutTitle>
        <AboutText>
          We specialize in creating unforgettable party experiences for our
          guests, whether it's a birthday bash, anniversary extravaganza, or any
          other special event worth celebrating. With our passion for
          hospitality and commitment to excellence, we're here to turn your
          gatherings into memorable moments that you'll cherish forever.
        </AboutText>
      </AboutContent>
    </AboutContainer>
  );
}

export default AboutDetails;
