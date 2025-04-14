import { AlbumListResponse } from '../types/album';

export const mockAlbumData: AlbumListResponse = {
  result: true,
  message: "Success",
  code: "200",
  external_data: null,
  album_list: [
    {
      id: 1,
      title: "NewJeans 2nd EP 'Get Up'",
      version_code: 1,
      released_at: "2023-07-21",
      artist: {
        id: 1,
        name: "NewJeans"
      },
      count: 5,
      published_album_list: []
    },
    {
      id: 2,
      title: "SEVENTEEN 10th Mini Album 'FML'",
      version_code: 1,
      released_at: "2023-04-24",
      artist: {
        id: 2,
        name: "SEVENTEEN"
      },
      count: 3,
      published_album_list: []
    },
    {
      id: 3,
      title: "LE SSERAFIM 2nd Mini Album 'ANTIFRAGILE'",
      version_code: 1,
      released_at: "2022-10-17",
      artist: {
        id: 3,
        name: "LE SSERAFIM"
      },
      count: 4,
      published_album_list: []
    },
    {
      id: 4,
      title: "IVE The 1st Album 'I've IVE'",
      version_code: 1,
      released_at: "2023-04-10",
      artist: {
        id: 4,
        name: "IVE"
      },
      count: 2,
      published_album_list: []
    },
    {
      id: 5,
      title: "aespa 3rd Mini Album 'MY WORLD'",
      version_code: 1,
      released_at: "2023-05-08",
      artist: {
        id: 5,
        name: "aespa"
      },
      count: 6,
      published_album_list: []
    }
  ]
}; 