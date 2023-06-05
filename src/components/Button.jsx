import React from 'react';
import PropTypes from 'prop-types';

function Button({
  type = 'button',
  id = '',
  onClick = () => {},
  text = '',
}) {
  return (
    <button
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
};

export default Button;
