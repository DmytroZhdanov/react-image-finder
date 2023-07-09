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
  images: PropTypes.arrayOf(
    PropTypes.shape({
      collections: PropTypes.number,
      comments: PropTypes.number,
      downloads: PropTypes.number,
      id: PropTypes.number.isRequired,
      imageHeight: PropTypes.number,
      imageSize: PropTypes.number,
      imageWidth: PropTypes.number,
      largeImageURL: PropTypes.string.isRequired,
      likes: PropTypes.number,
      pageURL: PropTypes.string,
      previewHeight: PropTypes.number,
      previewURL: PropTypes.string,
      previewWidth: PropTypes.number,
      tags: PropTypes.string.isRequired,
      type: PropTypes.string,
      user: PropTypes.string,
      userImageURL: PropTypes.string,
      user_id: PropTypes.number,
      views: PropTypes.number,
      webformatHeight: PropTypes.number,
      webformatURL: PropTypes.string.isRequired,
      webformatWidth: PropTypes.number,
    }).isRequired
  ).isRequired,
  setModalImg: PropTypes.func.isRequired,
};
