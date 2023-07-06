import { Component } from 'react';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    images: [],
    totalImages: 0,
    query: '',
    status: '',
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

  render() {
    const { images, totalImages, query, status } = this.state;

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
        />
      </Container>
    );
  }
}
