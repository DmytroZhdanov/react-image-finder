import { Component } from 'react';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Container } from './App.styled';
import { Modal } from 'components/Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    totalImages: 0,
    query: '',
    status: '',
    modalImage: '',
  };

  handleSearch = (images, totalImages, query) => {
    this.setState({ images, totalImages, query });
  };

  resetImages = () => {
    this.setState({ images: [] });
  };

  handleLoadMore = images => {
    this.setState(prevState => {
      return { images: [...prevState.images, ...images] };
    });
  };

  setStatus = status => {
    this.setState({ status });
  };

  setModalImg = (src, alt) => {
    this.setState({modalImage: {src, alt}})
  }

  resetModalImg = () => {
    this.setState( {modalImage: ''})
  }

  render() {
    const { images, totalImages, query, status, modalImage } = this.state;

    return (
      <Container>
        <Searchbar
          onSearch={this.handleSearch}
          setStatus={this.setStatus}
          resetImages={this.resetImages}
        />
        <ImageGallery
          images={images}
          totalImages={totalImages}
          query={query}
          onLoadMore={this.handleLoadMore}
          setStatus={this.setStatus}
          status={status}
          setModalImg={this.setModalImg}
        />
        {modalImage && <Modal image={modalImage} onClose={this.resetModalImg} />}
      </Container>
    );
  }
}
