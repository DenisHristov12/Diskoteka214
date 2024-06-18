import styled from 'styled-components';
import {
  respondToLandscapeTablets,
  respondToMobile,
} from '../styles/mediaQueries';

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const Label = styled.label`
  font-weight: 500;

  ${respondToLandscapeTablets(`
    font-size: 1.2rem;
  `)}

  ${respondToMobile(`
    font-size: 1rem;
  `)}
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);

  ${respondToLandscapeTablets(`
    font-size: 1.2rem;
  `)}

  ${respondToMobile(`
    font-size: 1rem;
  `)}
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
