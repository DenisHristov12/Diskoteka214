import {
  HiCurrencyDollar,
  HiHandRaised,
  HiMiniFaceSmile,
  HiPencil,
} from 'react-icons/hi2';
import styled from 'styled-components';
import {
  respondToLandscapeTablets,
  respondToMobile,
  respondToMobileSmall,
  respondToSmallLaptop,
} from '../styles/mediaQueries';

const BenefitsContainer = styled.div`
  padding: 5rem 2rem;
  background-color: var(--color-grey-0);
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 4rem;

  color: var(--color-grey-900);

  ${respondToSmallLaptop(`
    font-size: 1.8rem;
  `)}

  ${respondToLandscapeTablets(`
    font-size: 1.6rem;
  `)}

  ${respondToMobile(`
    font-size: 1.4rem;
  `)}

  ${respondToMobileSmall(`
    font-size: 1.2rem;
  `)}
`;

const BenefitsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
`;

const BenefitCard = styled.div`
  background-color: var(--color-grey-200);
  border-radius: 10px;
  padding: 2rem;
  max-width: 25rem;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-10px);
  }

  ${respondToSmallLaptop(`
    max-width: 20rem;
    padding: 1rem;
  `)}
`;

const IconWrapper = styled.div`
  font-size: 4.4rem;
  margin-bottom: 1.6rem;
  color: var(--color-brand-500);

  ${respondToSmallLaptop(`
  font-size: 4rem;
  `)}

  ${respondToMobile(`
  font-size: 3.6rem;
  `)}

  ${respondToMobileSmall(`
  font-size: 3rem;
  `)}
`;

const BenefitTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;

  ${respondToSmallLaptop(`
  font-size: 1.8rem;
  `)}

  ${respondToMobile(`
  font-size: 1.6rem;
  `)}

  ${respondToMobileSmall(`
  font-size: 1.4rem;
  `)}
`;

const BenefitDescription = styled.p`
  font-size: 1.6rem;
  line-height: 1.4;

  color: var(--color-grey-500);

  ${respondToSmallLaptop(`
  font-size: 1.4rem;
  `)}

  ${respondToMobile(`
  font-size: 1.3rem;
  `)}

  ${respondToMobileSmall(`
  font-size: 1.2rem;
  `)}
`;

const benefits = [
  {
    icon: <HiCurrencyDollar />,
    title: 'Affordable Pricing',
    description:
      'You can enjoy the highest quality events without breaking the bank.',
  },
  {
    icon: <HiMiniFaceSmile />,
    title: 'Memorable',
    description:
      'We strive to create magical moments that you and your guests will cherish forever.',
  },
  {
    icon: <HiHandRaised />,
    title: 'Exceptional Service',
    description:
      'We are committed to providing top-notch hospitality and personalized attention. ',
  },
  {
    icon: <HiPencil />,
    title: 'Attention to Detail',
    description:
      'From personal playlists to personalized touches and special surprises.',
  },
];

function BenefitsSection() {
  return (
    <BenefitsContainer>
      <SectionTitle>
        You'll be greeted with warmth, hospitality, and a commitment to making
        your event absolutely perfect.
      </SectionTitle>
      <BenefitsWrapper>
        {benefits.map((benefit, index) => (
          <BenefitCard key={index}>
            <IconWrapper>{benefit.icon}</IconWrapper>
            <BenefitTitle>{benefit.title}</BenefitTitle>
            <BenefitDescription>{benefit.description}</BenefitDescription>
          </BenefitCard>
        ))}
      </BenefitsWrapper>
    </BenefitsContainer>
  );
}

export default BenefitsSection;
