import { fetchImagebyQuery } from 'ApiService/ApiService';
import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { Container, Input, SearchButton, SearchForm } from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    input: '',
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { value } = e.target.elements.searchQuery;
    const { onSearch, page, setStatus, resetImages } = this.props;

    resetImages()
    setStatus('pending')

    try {
      const response = await fetchImagebyQuery(value, page);
      const { hits, totalHits } = response;
      onSearch(hits, totalHits, value);
      setStatus('resolved')
    } catch (error) {
      console.error(error.message);
      setStatus('rejected')
    } finally {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  handleInputChange = (e) => {
    this.setState({ input: e.target.value });
  };

  render() {
    return (
      <Container>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <ImSearch />
          </SearchButton>
          <Input
            type="text"
            name="searchQuery"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.input}
            onChange={this.handleInputChange}
          />
        </SearchForm>
      </Container>
    );
  }
}
