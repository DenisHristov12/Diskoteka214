import HeroSlider, {
  Slide,
  ButtonsNav,
  Nav,
  OverlayContainer,
} from 'hero-slider';
import styled from 'styled-components';

// const StyledHeroSlider = styled(HeroSlider)`
//   & {
//     position: relative;
//     width: 100%;
//     height: 100vh;
//     overflow: hidden;
//   }

//   & .slide {
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     background-size: cover;
//     background-position: center;
//   }
// `;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin: 0 auto;
  padding: 0;
  text-transform: uppercase;
  width: 90%;
  text-align: center;
  font-size: 3.5rem;
`;
const Subtitle = styled.h2`
  margin: 24px auto 0;
  padding: 0;
  width: 80%;
  text-align: center;
  font-size: 1.75rem;
`;

const hallstatt = 'https://i.imgur.com/Yszno5e.jpg';
const hvitserkur = 'https://i.imgur.com/ZBzbir7.jpg';
const jacksonville = 'https://i.imgur.com/xpeJkkR.jpg';
const moraineLake = 'https://i.imgur.com/0NAc45h.jpg';

const app = () => {
  return (
    <HeroSlider
      orientation='horizontal'
      initialSlide={1}
      onBeforeChange={(previousSlide, nextSlide) =>
        console.log('onBeforeChange', previousSlide, nextSlide)
      }
      onChange={(nextSlide) => console.log('onChange', nextSlide)}
      onAfterChange={(nextSlide) => console.log('onAfterChange', nextSlide)}
      style={{
        backgroundColor: '#000',
      }}
      settings={{
        slidingDuration: 500,
        slidingDelay: 100,
        shouldAutoplay: true,
        shouldDisplayButtons: true,
        autoplayDuration: 5000,
        height: '100vh',
      }}>
      {/* <OverlayContainer>
        <Wrapper>
          <Title>Zoom Slider</Title>
          <Subtitle>
            Slides' backgroundAnimation prop set to 'zoom' (you may reload the
            page if it's already over)
          </Subtitle>
        </Wrapper>
      </OverlayContainer> */}

      <Slide
        navDescription='Hallstatt - Austria'
        background={{
          backgroundImage: hallstatt,
          backgroundAnimation: 'zoom',
        }}
      />

      <Slide
        navDescription='Hvitserkur - Iceland'
        background={{
          backgroundImage: hvitserkur,
          backgroundAnimation: 'zoom',
        }}
      />

      <Slide
        navDescription='Jacksonville - USA'
        background={{
          backgroundImage: jacksonville,
          backgroundAnimation: 'zoom',
        }}
      />

      <Slide
        navDescription='Moraine Lake - Canada'
        background={{
          backgroundImage: moraineLake,
          backgroundAnimation: 'zoom',
        }}
      />

      <ButtonsNav
        isNullAfterThreshold
        position={{
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />
      <Nav />
    </HeroSlider>
  );
};

export default app;
