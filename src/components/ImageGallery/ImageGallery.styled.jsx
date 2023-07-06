import styled from '@emotion/styled';

export const Gallery = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

export const ErrorMsg = styled.p`
  font-weight: 600;
  font-size: 24px;
  text-align: center;
`

export const ErrorImg = styled.img`
  width: 300px;
  margin: auto;
`;
