export interface Artist {
  id: number;
  name: string;
}

export interface PublishedAlbum {
  id: number;
  album_type: number;
  uuid: string;
  box_image_url?: string;
  nfc_image_url?: string;
  nfc_image_id?: number;
  nfc_image_index?: number;
}

export interface Album {
  id: number;
  title: string;
  version_code: number;
  count: number;
  released_at: string;
  artist?: Artist;
  published_album_list: PublishedAlbum[];
  coverImage?: string | { default: string }; // Import된 이미지 타입 지원
  isUpdate?: boolean;
}

export interface AlbumListResponse {
  result: boolean;
  message: string;
  code: string;
  external_data: any;
  album_list: Album[];
}
