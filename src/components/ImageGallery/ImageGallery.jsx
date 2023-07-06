import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { ErrorImg, ErrorMsg, Gallery, Loader } from './ImageGallery.styled';
import { Button } from 'components/Button/Button';
import { fetchImagebyQuery } from 'ApiService/ApiService';
import { ThreeDots } from 'react-loader-spinner';
import errorImg from '../../error.png';

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
          {status === 'pending' && (
            <Loader>
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#3f51b5"
                ariaLabel="three-dots-loading"
                visible={true}
              />
            </Loader>
          )}
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
