import { Component } from 'react';
import { Image, Item } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  render() {
    const { url, tags } = this.props;

    return (
      <Item>
        <Image src={url} alt={tags} />
      </Item>
    );
  }
}
