import styled, { css } from 'styled-components';
import {
  respondToLandscapeTablets,
  respondToMobile,
  respondToMobileSmall,
  respondToSmallLaptop,
} from '../styles/mediaQueries';

const Heading = styled.h1`
  ${(props) =>
    props.as === 'h1' &&
    css`
      font-size: 3rem;
      font-weight: 600;

      ${respondToSmallLaptop(`font-size: 2.6rem;`)}
      ${respondToLandscapeTablets(`font-size: 2.4rem;`)}
      ${respondToMobile(`font-size: 2rem;`)}
    `}

  ${(props) =>
    props.as === 'h2' &&
    css`
      font-size: 2rem;
      font-weight: 600;

      ${respondToLandscapeTablets(`font-size: 1.8rem;`)}
      ${respondToMobile(`font-size: 1.4rem;`)}
      ${respondToMobileSmall(`font-size: 1.2rem;`)}
    `}
    
    ${(props) =>
    props.as === 'h3' &&
    css`
      font-size: 2rem;
      font-weight: 600;

      ${respondToLandscapeTablets(`font-size: 1.8rem;`)}
      ${respondToMobile(`font-size: 1.4rem;`)}
      ${respondToMobileSmall(`font-size: 1.2rem;`)}
    `}
    
    ${(props) =>
    props.as === 'h4' &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;

      ${respondToLandscapeTablets(`font-size: 2.4rem;`)}
      ${respondToMobile(`font-size: 2rem;`)}
      ${respondToMobileSmall(`font-size: 1.6rem;`)}
    `}
    
  line-height: 1.4;
`;

export default Heading;
