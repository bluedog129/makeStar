export type FallbackImageMap = {
  [key: string]: string;
};

export type ArtistName = 'NewJeans' | 'aespa' | 'IVE' | 'LE SSERAFIM' | 'SEVENTEEN' | 'default';

export interface ImageAssets {
  fallbackImages: Record<ArtistName, string>;
  noImage: string;
} 