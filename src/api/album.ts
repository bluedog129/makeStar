import { API_HEADERS, getEndpoint } from './config';
import { AlbumListResponse } from '../types/album';

interface DownloadInfo {
  // API 응답 타입 정의
  album_id: number;
  // 다른 필요한 필드들도 여기에 추가
}

export const getOwnAlbumList = async (): Promise<AlbumListResponse> => {
  const url = getEndpoint('/get_own_album_list_info/');
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

export const getDownloadInfo = async (albumId: number): Promise<DownloadInfo> => {
  try {
    const response = await fetch(import.meta.env.VITE_GET_DOWNLOAD_INFO_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': import.meta.env.VITE_API_AUTH_TOKEN,
      },
      body: JSON.stringify({
        album_id: albumId
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch download info');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching download info:', error);
    throw error;
  }
};