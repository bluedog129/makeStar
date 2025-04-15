export interface Artist {
  id: number;
  name: string;
}

export interface PublishedAlbum {
  album_type: number;
  box_image_url: string;
  id: number;
  nfc_image_id: number;
  nfc_image_index: number;
  nfc_image_url: string;
  uuid: string;
}

export interface Album {
  id: number;
  artist: Artist;
  count: number;
  coverImage?: string;
  isUpdate: boolean;
  published_album_list: PublishedAlbum[];
  released_at: string;
  title: string;
  version_code: number;
}

export interface AlbumListResponse {
  result: boolean;
  message: string;
  code: string;
  external_data: null;
  album_list: Album[];
}
