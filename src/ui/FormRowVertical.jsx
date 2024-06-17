import styled from 'styled-components';
import { respondToLandscapeTablets } from '../styles/mediaQueries';

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;

  ${respondToLandscapeTablets(`
     gap: 0.6rem;
    padding: 1rem 0;
  `)}
`;

const Label = styled.label`
  font-weight: 500;

  ${respondToLandscapeTablets(`
    font-size: 1.2rem;
  `)}
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRowVertical({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowVertical;
