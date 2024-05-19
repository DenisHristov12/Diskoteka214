import styled from 'styled-components';

const AboutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 5rem;
  background-color: #f9f9f9;
  color: #333;
  text-align: left;
`;

const AboutContent = styled.div`
  max-width: 60rem;
  padding: 2rem;
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
`;

const AboutText = styled.p`
  font-size: 1.8rem;
  line-height: 1.6;
`;

function AboutDetails() {
  return (
    <AboutContainer>
      <AboutImage src='party.jpg' alt='About Us' />
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
