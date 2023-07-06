import PropTypes from 'prop-types';
import { Component } from 'react';
import { Btn } from './Button.styled';

export class Button extends Component {
  handleClick = () => {
    this.props.onClick();
  };

  render() {
    return <Btn onClick={this.handleClick}>Load more</Btn>;
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
