import styled from 'styled-components';

const TestimonialsContainer = styled.div`
  padding: 5rem 2rem;
  background-color: var(--color-grey-0);
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.4rem;
  margin-bottom: 9rem;
  color: var(--color-grey-900);
`;

const TestimonialsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
`;

const TestimonialCard = styled.div`
  background-color: var(--color-grey-200);
  border-radius: 10px;
  padding: 2rem 2rem 4rem;
  max-width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  overflow: visible;
`;

const UserImage = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  border: 4px solid #fff;
  position: absolute;
  top: -4rem;
  left: 50%;
  transform: translateX(-50%);
`;

const UserName = styled.h3`
  font-size: 1.6rem;
  margin-top: 4.8rem;
  color: var(--color-grey-900);
`;

const UserTitle = styled.p`
  font-size: 1.2rem;
  color: var(--color-grey-600);
  margin-bottom: 2rem;
`;

const UserFeedback = styled.p`
  font-size: 1.4rem;
  line-height: 1.6;
  color: var(--color-grey-500);
`;

const testimonials = [
  {
    name: 'Ivan Nikolov',
    title: 'Profesionalna Utaika',
    feedback:
      'Dude, my birthday was straight-up legendary! The vibes were electric, the tunes were fire, and the party never stopped! Massive shoutout to the squad for turning my special day into an unforgettable fiesta. You guys rock!',
    image: 'default-user.jpg',
  },
  {
    name: 'Kiril Kirilov',
    title: 'Mafiot pod prikritie',
    feedback:
      'OMG, hosting my sweet 20  was an absolute blast! The venue was decked out with all the latest trends, the food was off the charts delish, and the DJ had us lit all night long. Thanks for making my big day totally lit!',
    image: 'default-user.jpg',
  },
  {
    name: 'Dimitar Dimitrov',
    title: 'Bodyguard',
    feedback:
      "The drinks were flowing, the dance floor was poppin, and the vibes were next-level. Major props to the squad for hooking us up with the ultimate party experience. Honestly, the best party I have ever been! Can't wait to do it again!",
    image: 'default-user.jpg',
  },
];

function TestimonialsSection() {
  return (
    <TestimonialsContainer>
      <SectionTitle>
        Hear what our satisfied guests have to say about their experiences
      </SectionTitle>
      <TestimonialsWrapper>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index}>
            <UserImage src={testimonial.image} alt={testimonial.name} />
            <UserName>{testimonial.name}</UserName>
            <UserTitle>{testimonial.title}</UserTitle>
            <UserFeedback>{testimonial.feedback}</UserFeedback>
          </TestimonialCard>
        ))}
      </TestimonialsWrapper>
    </TestimonialsContainer>
  );
}

export default TestimonialsSection;
