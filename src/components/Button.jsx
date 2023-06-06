import React from 'react';
import PropTypes from 'prop-types';

function Button({
  disabled = false,
  id = '',
  name = '',
  onClick = () => {},
  text = '',
  type = 'button',
}) {
  return (
    <button
      data-testid={ id }
      disabled={ disabled }
      id={ id }
      name={ name }
      onClick={ onClick }
      type={ type }
    >
      { text }
    </button>
  );
}

Button.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.string,
};

export default Button;
