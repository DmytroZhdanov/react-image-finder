import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalContent, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount = () => {
    window.addEventListener('keydown', this.onKeydown);
  };

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.onKeydown);
  };

  closeModal = () => {
    this.props.onClose();
  };

  onKeydown = e => {
    if (e.code === 'Escape') {
      this.closeModal();
    }
    return;
  };

  handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.closeModal();
    }
    return;
  };

  render() {
    const { src, alt } = this.props.image;

    return createPortal(
      <Overlay onClick={this.handleOverlayClick}>
        <ModalContent>
          <img src={src} alt={alt} />
        </ModalContent>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
