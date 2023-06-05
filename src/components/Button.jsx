import React from 'react';
import PropTypes from 'prop-types';

function Button({
  disabled = false,
  type = 'button',
  id = '',
  onClick = () => {},
  text = '',
}) {
  return (
    <button
      disabled={ disabled }
      type={ type }
      id={ id }
      data-testid={ id }
      onClick={ onClick }
    >
      { text }
    </button>
  );
}

Button.propTypes = {
  id: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
