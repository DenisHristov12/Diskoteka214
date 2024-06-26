import styled from 'styled-components';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import {
  respondToLandscapeTablets,
  respondToMobileSmall,
  respondToSmallLaptop,
} from '../styles/mediaQueries';

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === 'white'
        ? 'var(--color-grey-100)'
        : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);

  ${respondToSmallLaptop(`font-size: 1.2rem;`)}
  ${respondToLandscapeTablets(`font-size: 1rem;`)}
  ${respondToMobileSmall(`font-size: 0.8rem;`)}
`;

const Select = forwardRef(({ options, value, onChange, ...props }, ref) => (
  <StyledSelect ref={ref} value={value} onChange={onChange} {...props}>
    {options.map((option) => (
      <option value={option.value} key={option.value}>
        {option.label}
      </option>
    ))}
  </StyledSelect>
));

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
};

Select.defaultProps = {
  value: undefined,
  onChange: undefined,
  type: 'default',
};

export default Select;
