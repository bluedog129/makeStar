import { Album } from '@/types/album';

// Album 컴포넌트 Props
export interface AlbumSwiperProps {
  albums?: Album[];
  onSlideChange?: (index: number) => void;
}

export interface PocaAlbumInfoProps {
  title: string;
  artist: string;
  releasedAt: string;
}

export interface AlbumItemProps {
  album: Album;
}

// 다운로드 관련 타입
export interface DownloadState {
  isDownloading: boolean;
  current: number;
  total: number;
  totalSize?: number; // MB 단위의 파일 크기
}

export interface DownloadProgressProps {
  current: number;
  total: number;
  totalSize?: number;
  onCancel: () => void;
}

// SelectForm 관련 타입
export interface SelectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  onDelete: () => void;
}

export interface SelectContainerStyleProps {
  $isOpen: boolean;
}

// SortBottomSheet 관련 타입
export type SortType = 'latest' | 'name';

export interface SortBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSort?: (sortType: SortType) => void;
}

export interface OverlayStyleProps {
  $isOpen: boolean;
}

export interface SheetStyleProps {
  $isOpen: boolean;
}

export interface SortOptionStyleProps {
  $isSelected: boolean;
}

export interface StyledAlbumProps {
  $isInactive: boolean;
}

export interface AlbumImageProps extends StyledAlbumProps {
  coverImage: string | { default: string };
  title: string;
}

export interface AlbumInfoStyleProps {
  $isInactive: boolean;
}

export interface SubInfoStyleProps {
  $isInactive: boolean;
}

export interface CountStyleProps {
  $isInactive: boolean;
}