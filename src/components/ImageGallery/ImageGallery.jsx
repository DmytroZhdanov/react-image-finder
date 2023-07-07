import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { ErrorImg, ErrorMsg, Gallery } from './ImageGallery.styled';
import { Button } from 'components/Button/Button';
import errorImg from '../../error.png';
import { Loader } from 'components/Loader/Loader';

export class ImageGallery extends Component {
  state = {
    totalPages: this.props.totalImages / 12,
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { totalImages, query, setStatus } = this.props;
    const { totalPages } = this.state;

    if (prevProps.totalImages !== totalImages) {
      this.setState({ totalPages: totalImages / 12 });
    }

    if (!totalImages && query && prevProps.query !== query) {
      setStatus('rejected');
    }

    if (totalPages && prevState.totalPages !== totalPages) {
      setStatus('resolved');
    }
  };

  handleLoadMore = () => {
    this.props.onLoadMore();
  };

  render() {
    const { images, status, query, setModalImg, page } = this.props;
    const { totalPages } = this.state;

    if (status === 'pending' || status === 'resolved') {
      return (
        <>
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
          {page < totalPages && status !== 'pending' && (
            <Button onClick={this.handleLoadMore} />
          )}
          {status === 'pending' && <Loader />}
        </>
      );
    }

    if (status === 'rejected') {
      return (
        <>
          <ErrorMsg>
            Sorry... We couldn't find pictures matching "{query}"
          </ErrorMsg>
          <ErrorImg src={errorImg} alt="Error" />
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  totalImages: PropTypes.number.isRequired,
  query: PropTypes.string.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  setModalImg: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};
