import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { Gallery } from './ImageGallery.styled';

export class ImageGallery extends Component {
  render() {
    const { images, setModalImg } = this.props;

    return (
      <Gallery>
        {images.map(({ webformatURL, tags, largeImageURL }, index) => (
          <ImageGalleryItem
            key={index}
            modalUrl={largeImageURL}
            url={webformatURL}
            tags={tags}
            setModalImg={setModalImg}
          />
        ))}
      </Gallery>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  setModalImg: PropTypes.func.isRequired,
};
