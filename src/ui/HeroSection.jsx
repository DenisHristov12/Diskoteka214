import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import HeroSlider, { Slide, Nav } from 'hero-slider';

// const HeroContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 80vh;
//   background: ${({ backgroundImage }) => `url(${backgroundImage})`} no-repeat
//     center center/cover;
//   color: #fff;
//   text-align: center;
// `;

// const HeroContent = styled.div`
//   max-width: 60rem;
//   padding: 2rem;
//   background: rgba(0, 0, 0, 0.5);
//   border-radius: 1rem;
// `;

// const HeroTitle = styled.h1`
//   font-size: 3rem;
//   margin-bottom: 2rem;
// `;

// const HeroSubtitle = styled.p`
//   font-size: 1.6rem;
//   margin-bottom: 4rem;
// `;

// const HeroButton = styled.button`
//   padding: 1rem 2rem;
//   font-size: 1.2rem;
//   color: #fff;
//   background-color: #ff7f50;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: all 0.3s ease;

//   &:hover {
//     background-color: #ff6347;
//   }
// `;

const HeroSliderComponent = () => {
  return (
    <HeroSlider
      slidingAnimation='fade'
      orientation='horizontal'
      initialSlide={0}
      onBeforeChange={(previousSlide, nextSlide) =>
        console.log('onBeforeChange', previousSlide, nextSlide)
      }
      onChange={(nextSlide) => console.log('onChange', nextSlide)}
      onAfterChange={(nextSlide) => console.log('onAfterChange', nextSlide)}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.33)',
      }}
      settings={{
        slidingDuration: 500,
        slidingDelay: 100,
        shouldAutoplay: true,
        shouldDisplayButtons: true,
        autoplayDuration: 5000,
        height: '100vh',
      }}>
      <Slide
        shouldRenderMask
        label='Slide 1'
        background={{
          backgroundImageSrc: 'https://via.placeholder.com/1920x1080',
        }}
      />
      <Slide
        shouldRenderMask
        label='Slide 2'
        background={{
          backgroundImageSrc:
            'https://via.placeholder.com/1920x1080/FF0000/FFFFFF',
        }}
      />
      <Slide
        shouldRenderMask
        label='Slide 3'
        background={{
          backgroundImageSrc:
            'https://via.placeholder.com/1920x1080/00FF00/000000',
        }}
      />
      <Nav />
    </HeroSlider>
  );
};

export default HeroSliderComponent;
