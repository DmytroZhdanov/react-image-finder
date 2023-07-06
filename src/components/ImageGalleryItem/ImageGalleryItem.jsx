import { Component } from 'react';
import { Btn, Image, Item } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  handleClick = (src, alt) => {
    this.props.setModalImg(src, alt);
  }

  render() {
    const { modalUrl, url, tags, } = this.props;

    return (
      <Item>
        <Btn onClick={() => this.handleClick(modalUrl, tags)} type="button">
          <Image src={url} alt={tags} />
        </Btn>
      </Item>
    );
  }
}
