import { API_BASE_URL, API_HEADERS } from './config';
import { AlbumListResponse } from '../types/album';

//https://dev-api.pocaalbum.com/apis/v1/pocaalbum/get_own_album_list_info/

export const getOwnAlbumList = async (): Promise<AlbumListResponse> => {
  const url = `/apis/v1/pocaalbum/get_own_album_list_info/`;
  console.log('Requesting URL:', url);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...API_HEADERS,
        'Accept': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      console.error('API Error:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        headers: Object.fromEntries(response.headers.entries()),
      });
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Failed to fetch album list: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('API Response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching album list:', error);
    throw error;
  }
};