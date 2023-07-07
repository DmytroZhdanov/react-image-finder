import { Component } from 'react';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Container } from './App.styled';
import { Modal } from 'components/Modal/Modal';
import { fetchImages } from 'ApiService/ApiService';

export class App extends Component {
  state = {
    images: [],
    totalImages: 0,
    query: '',
    status: 'idle',
    modalImage: '',
    page: 0,
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { page, query } = this.state;

    if (page !== prevState.page || query !== prevState.query) {
      this.setStatus('pending');
      try {
        const response = await fetchImages(query, page);
        const { hits, totalHits } = response;
        this.setState({
          totalImages: totalHits,
        });

        page !== prevState.page
          ? this.setState(prevState => {
              return { images: [...prevState.images, ...hits] };
            })
          : this.setState({ images: hits });
        this.setStatus(totalHits ? 'resolved' : 'rejected');
      } catch (error) {
        console.error(error.message);
        this.setStatus('rejected');
      }

      if (query !== prevState.query) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    }
  };

  handleSearch = query => {
    this.setState({ images: [], page: 1, query });
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  setStatus = status => {
    this.setState({ status });
  };

  setModalImg = (src, alt) => {
    this.setState({ modalImage: { src, alt } });
  };

  resetModalImg = () => {
    this.setState({ modalImage: '' });
  };

  render() {
    const { images, totalImages, query, status, modalImage, page } = this.state;

    return (
      <Container>
        <Searchbar
          onSearch={this.handleSearch}
        />
        <ImageGallery
          images={images}
          totalImages={totalImages}
          query={query}
          onLoadMore={this.handleLoadMore}
          setStatus={this.setStatus}
          status={status}
          setModalImg={this.setModalImg}
          page={page}
        />
        {modalImage && (
          <Modal image={modalImage} onClose={this.resetModalImg} />
        )}
      </Container>
    );
  }
}
