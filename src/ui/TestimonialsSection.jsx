import styled from 'styled-components';

const TestimonialsContainer = styled.div`
  padding: 5rem 2rem;
  background-color: #f9f9f9;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 4rem;
  color: #333;
`;

const TestimonialsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
`;

const TestimonialCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 2rem;
  max-width: 30rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

const UserImage = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  margin-bottom: 1.6rem;
`;

const UserName = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #eda641;
`;

const UserFeedback = styled.p`
  font-size: 1.4rem;
  line-height: 1.6;
  color: #666;
`;

const testimonials = [
  {
    name: 'Ivan Nikolov',
    feedback:
      'Dude, my birthday was straight-up legendary! The vibes were electric, the tunes were fire, and the party never stopped! Massive shoutout to the squad for turning my special day into an unforgettable fiesta. You guys rock!',
    image: 'default-user.jpg',
  },
  {
    name: 'Kiril Kirilov',
    feedback:
      'OMG, hosting my sweet 20  was an absolute blast! The venue was decked out with all the latest trends, the food was off the charts delish, and the DJ had us lit all night long. Thanks for making my big day totally lit!',
    image: 'default-user.jpg',
  },
  {
    name: 'Dimitar Dimitrov',
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
            <UserFeedback>{testimonial.feedback}</UserFeedback>
          </TestimonialCard>
        ))}
      </TestimonialsWrapper>
    </TestimonialsContainer>
  );
}

export default TestimonialsSection;
