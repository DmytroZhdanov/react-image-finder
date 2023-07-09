import { Component } from 'react';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Container, ErrorImg, ErrorMsg } from './App.styled';
import { Modal } from 'components/Modal/Modal';
import { fetchImages } from 'ApiService/ApiService';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import errorImg from '../../error.png';

export class App extends Component {
  state = {
    images: [],
    query: '',
    status: 'idle',
    modalImage: '',
    page: 0,
    totalPages: 0,
  };

  componentDidUpdate = async (_, prevState) => {
    const { page, query } = this.state;

    if (page !== prevState.page || query !== prevState.query) {
      this.setStatus('pending');
      try {
        const { hits, totalHits } = await fetchImages(query, page);

        this.setState({
          totalPages: totalHits / 12,
        });

        query === prevState.query
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
    const { images, query, status, modalImage, page, totalPages } =
      this.state;

    return (
      <Container>
        <Searchbar onSearch={this.handleSearch} />
        {(status === 'pending' || status === 'resolved') && (
          <>
            <ImageGallery images={images} setModalImg={this.setModalImg} />
            {page < totalPages && status !== 'pending' && (
              <Button onClick={this.handleLoadMore} />
            )}
            {status === 'pending' && <Loader />}
          </>
        )}
        {status === 'rejected' && (
          <>
            <ErrorMsg>
              Sorry... We couldn't find pictures matching "{query}"
            </ErrorMsg>
            <ErrorImg src={errorImg} alt="Error" />
          </>
        )}
        {modalImage && (
          <Modal image={modalImage} onClose={this.resetModalImg} />
        )}
      </Container>
    );
  }
}
