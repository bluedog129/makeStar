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
  coverImage?: string | { default: string };
  isUpdate?: boolean;
}

export interface AlbumListResponse {
  result: boolean;
  message: string;
  code: string;
  external_data: Record<string, unknown>;
  album_list: Album[];
}
