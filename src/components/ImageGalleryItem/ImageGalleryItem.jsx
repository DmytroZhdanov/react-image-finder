import PropTypes from 'prop-types';
import { Component } from 'react';
import { Btn, Image, Item } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  handleClick = (src, alt) => {
    this.props.setModalImg(src, alt);
  };

  render() {
    const { modalUrl, url, tags } = this.props;

    return (
      <Item>
        <Btn onClick={() => this.handleClick(modalUrl, tags)} type="button">
          <Image src={url} alt={tags} />
        </Btn>
      </Item>
    );
  }
}

ImageGalleryItem.propTypes = {
  modalUrl: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  setModalImg: PropTypes.func.isRequired,
};
