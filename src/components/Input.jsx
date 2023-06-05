import React from 'react';
import PropTypes from 'prop-types';

function Input({
  id = '',
  name = '',
  type = 'text',
  value = '',
  onChange = () => {},
}) {
  return (
    <input
      id={ id }
      data-testid={ id }
      onChange={ onChange }
      name={ name }
      type={ type }
      value={ value }
    />
  );
}

Input.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
