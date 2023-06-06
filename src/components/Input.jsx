import React from 'react';
import PropTypes from 'prop-types';

function Input({
  id = '',
  name = '',
  onChange = () => {},
  placeholder = '',
  type = 'text',
  value = '',
}) {
  return (
    <input
      data-testid={ id }
      id={ id }
      name={ name }
      onChange={ onChange }
      placeholder={ placeholder }
      type={ type }
      value={ value }
    />
  );
}

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default Input;
