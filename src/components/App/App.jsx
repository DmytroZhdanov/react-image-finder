import { Component } from 'react';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    images: [],
    totalImages: 0,
    query: '',
  };

  handleSearch = (images, totalImages, query) => {
    this.setState({ images, totalImages, query });
  };

  handleLoadMore = images => {
    this.setState(prevState => {
      return { images: [...prevState.images, ...images] };
    });
  };

  render() {
    const { images, totalImages, query } = this.state;

    return (
      <Container>
        <Searchbar onSearch={this.handleSearch} />
        <ImageGallery
          images={images}
          totalImages={totalImages}
          query={query}
          onLoadMore={this.handleLoadMore}
        />
      </Container>
    );
  }
}
