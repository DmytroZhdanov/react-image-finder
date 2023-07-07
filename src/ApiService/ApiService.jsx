import axios from 'axios';

const API_KEY = '36673095-e5e2632949512909003f8c0e7';

export async function fetchImages(query, page=1) {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data
}
