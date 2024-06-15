import { useEffect, useState } from 'react';
import { HiArrowDownLeft, HiArrowLeft, HiArrowRight } from 'react-icons/hi2';
import styled, { css, keyframes } from 'styled-components';

const slideIn = keyframes`
 
    0% {
      right: -50%;
    }
    100% {
      right: 0%;
    }
  
`;
const slideOut = keyframes`
 
    0% {
      left: -50%;
    }
    100% {
      left: 0%;
    }
  
`;

const Container = styled.div`
  width: 100vw;
  height: 92vh;
  position: relative;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  right: 0;
  animation: ${slideIn} 2s ease;

  ${(props) =>
    props.direction === 'forward'
      ? css`
          animation: ${slideIn} 1s ease;
        `
      : css`
          animation: ${slideOut} 1s ease;
        `}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NavButton = styled.button`
  width: 2.4rem;
  height: 2.4rem;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  position: absolute;
  top: 50%;
  border-radius: 50%;
  color: var(--color-grey-0);
  box-shadow: 0px 4px 60px 20px rgba(3, 3, 3, 0.9),
    inset 0 --3em 3em rgba(3, 3, 3, 0.5);
  transform: translate(0, -50%);
  ${(props) =>
    props.right === true
      ? css`
          right: 2%;
        `
      : css`
          left: 2%;
        `}
`;

const Title = styled.h3`
  font-size: 1.8rem;
  color: var(--color-grey-0);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0);
  box-shadow: 0px 4px 10px 15px rgba(3, 3, 3, 0.9),
    inset 0 --3em 3em rgba(3, 3, 3, 0.5);
`;

const DotContainer = styled.div`
  display: flex;
  gap: 0.6rem;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translate(-50%, 0);
`;

const Dot = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: var(--color-grey-0);
  cursor: pointer;
  ${(props) =>
    props.active === true
      ? css`
          background-color: var(--color-grey-400);
        `
      : css`
          background-color: var(--color-grey-0);
        `}
`;

const images = [
  {
    title: 'Test image 1',
    image: '/nature1.jpg',
  },
  {
    title: 'Test image 2',
    image: '/nature2.jpg',
  },
];

function ZoomSlider() {
  const [image, setImage] = useState('');
  const [imageIndex, setImageIndex] = useState(0);
  const [direction, setDirection] = useState('forward');

  useEffect(
    function () {
      setImage(images[imageIndex].image);
    },
    [imageIndex]
  );

  function handleNext() {
    setImageIndex((prevIndex) => prevIndex + 1);
    setDirection('forward');

    if (imageIndex === images.length - 1) {
      setImageIndex(0);
    }
  }

  function handlePrev() {
    setImageIndex((prevIndex) => prevIndex - 1);
    setDirection('backwards');

    if (imageIndex === 0) {
      setImageIndex(images.length - 1);
    }
  }

  return (
    <Container>
      {images[imageIndex].image === image && (
        <ImageContainer direction={direction}>
          <Image src={image} />

          <Title>{images[imageIndex].title}</Title>
        </ImageContainer>
      )}

      <NavButton onClick={handlePrev}>
        <HiArrowLeft />
      </NavButton>
      <NavButton right onClick={handleNext}>
        <HiArrowRight />
      </NavButton>
      <DotContainer>
        {images.map((dot, i) => (
          <Dot key={dot.image} active={i === imageIndex} />
        ))}
      </DotContainer>
    </Container>
  );
}

export default ZoomSlider;
