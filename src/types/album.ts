export interface Artist {
  id: number;
  name: string;
}

export interface PublishedAlbum {
  id: number;
  album_type: number;
  nfc_image_id: number;
  nfc_image_index: number;
  nfc_image_url: string;
  box_image_url: string;
  uuid: string;
}

export interface Album {
  id: number;
  title: string;
  coverImage: string;
  isUpdate: boolean;
  artist?: {
    name: string;
  };
  released_at?: string;
  version_code: number;
  count: number;
  published_album_list: PublishedAlbum[];
}

export interface AlbumListResponse {
  result: boolean;
  message: string;
  code: string;
  external_data: null;
  album_list: Album[];
} 