import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { ErrorImg, ErrorMsg, Gallery } from './ImageGallery.styled';
import { Button } from 'components/Button/Button';
import { fetchImagebyQuery } from 'ApiService/ApiService';
import errorImg from '../../error.png';
import { Loader } from 'components/Loader/Loader';

export class ImageGallery extends Component {
  state = {
    page: 1,
    totalPages: this.props.totalImages / 12,
  };

  componentDidMount = () => {
    this.props.setStatus('idle');
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { totalImages, query, onLoadMore, setStatus } = this.props;
    const { page, totalPages } = this.state;

    if (prevProps.totalImages !== totalImages) {
      this.setState({ totalPages: totalImages / 12 });
    }

    if (prevState.page < page) {
      setStatus('pending');
      try {
        const response = await fetchImagebyQuery(query, page);
        onLoadMore(response.hits);
        if (response.totalHits > 0) {
          setStatus('resolved');
        }
      } catch (error) {
        console.error(error.message);
        setStatus('rejected');
      }
    }

    if (prevProps.query !== query) {
      this.setState({ page: 1 });
    }

    if (!totalImages && query && prevProps.query !== query) {
      setStatus('rejected');
    }

    if (totalPages && prevState.totalPages !== totalPages) {
      setStatus('resolved');
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { images, status, query, setModalImg } = this.props;
    const { page, totalPages } = this.state;

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
};
