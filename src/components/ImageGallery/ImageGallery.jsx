import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { Gallery } from './ImageGallery.styled';
import { Button } from 'components/Button/Button';
import { fetchImagebyQuery } from 'ApiService/ApiService';

export class ImageGallery extends Component {
  state = {
    page: 1,
    totalPages: this.props.totalImages / 12,
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { totalImages, query, onLoadMore } = this.props;
    const { page } = this.state;

    if (prevProps.totalImages !== totalImages) {
      this.setState({ totalPages: totalImages / 12 });
    }

    if (prevState.page !== page) {
      try {
        const response = await fetchImagebyQuery(query, page);
        onLoadMore(response.hits);
      } catch (error) {
        console.error(error.message);
      }
    }

    if (prevProps.query !== query) {
      this.setState({ page: 1 });
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { images } = this.props;
    const { page, totalPages } = this.state;

    return (
      <>
        <Gallery>
          {images.map(({ webformatURL, tags }, index) => (
            <ImageGalleryItem key={index} url={webformatURL} tags={tags} />
          ))}
        </Gallery>
        {page < totalPages && <Button onClick={this.handleLoadMore} />}
      </>
    );
  }
}
