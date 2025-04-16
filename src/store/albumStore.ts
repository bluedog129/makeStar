import { create } from 'zustand';
import { Album } from '@/types/album';

interface DownloadQueueItem {
  albumId: number;
  status: 'waiting' | 'downloading' | 'completed' | 'error';
}

interface AlbumStore {
  albums: Album[];
  downloadQueue: DownloadQueueItem[];
  setAlbums: (albums: Album[]) => void;
  addAlbum: (album: Album) => void;
  updateAlbum: (id: number, updates: Partial<Album>) => void;
  removeAlbum: (id: number) => void;
  addToDownloadQueue: (albumId: number) => void;
  removeFromDownloadQueue: (albumId: number) => void;
  updateDownloadStatus: (albumId: number, status: DownloadQueueItem['status']) => void;
  isDownloading: (albumId: number) => boolean;
  isInQueue: (albumId: number) => boolean;
  startNextDownload: () => number | null;
  getQueuePosition: (albumId: number) => number;
}

const useAlbumStore = create<AlbumStore>((set, get) => ({
  albums: [],
  downloadQueue: [],
  
  setAlbums: (albums) => set({ albums }),
  
  addAlbum: (album) => set((state) => ({
    albums: [...state.albums, album],
  })),
  
  updateAlbum: (id, updates) => set((state) => ({
    albums: state.albums.map((album) =>
      album.id === id ? { ...album, ...updates } : album
    ),
  })),
  
  removeAlbum: (id) => set((state) => ({
    albums: state.albums.filter((album) => album.id !== id),
  })),

  addToDownloadQueue: (albumId) => set((state) => {
    // 이미 큐에 있다면 추가하지 않음
    if (state.downloadQueue.some(item => item.albumId === albumId)) {
      return state;
    }
    
    // 큐가 비어있거나 다운로드 중인 항목이 없을 때만 downloading 상태로 설정
    const hasDownloading = state.downloadQueue.some(item => item.status === 'downloading');
    const status = !hasDownloading ? 'downloading' : 'waiting';
    
    return {
      downloadQueue: [...state.downloadQueue, { albumId, status }],
    };
  }),

  removeFromDownloadQueue: (albumId) => set((state) => {
    const newQueue = state.downloadQueue.filter((item) => item.albumId !== albumId);
    
    // 제거된 항목이 downloading 상태였고, 대기 중인 항목이 있다면
    // 첫 번째 대기 항목만 downloading 상태로 변경
    const removedItem = state.downloadQueue.find(item => item.albumId === albumId);
    if (removedItem?.status === 'downloading' && newQueue.length > 0) {
      const nextItem = newQueue.find(item => item.status === 'waiting');
      if (nextItem) {
        nextItem.status = 'downloading';
      }
    }
    
    return { downloadQueue: newQueue };
  }),

  updateDownloadStatus: (albumId, status) => set((state) => ({
    downloadQueue: state.downloadQueue.map((item) =>
      item.albumId === albumId ? { ...item, status } : item
    ),
  })),

  isDownloading: (albumId) => {
    const state = get();
    return state.downloadQueue.some(
      (item) => item.albumId === albumId && item.status === 'downloading'
    );
  },

  isInQueue: (albumId) => {
    const state = get();
    return state.downloadQueue.some((item) => item.albumId === albumId);
  },

  startNextDownload: () => {
    const state = get();
    // 현재 다운로드 중인 항목이 있다면 다음 다운로드를 시작하지 않음
    const hasDownloading = state.downloadQueue.some(item => item.status === 'downloading');
    if (hasDownloading) {
      return null;
    }
    
    // 대기 중인 첫 번째 항목을 찾아서 다운로드 상태로 변경
    const waitingItem = state.downloadQueue.find(item => item.status === 'waiting');
    if (waitingItem) {
      set((state) => ({
        downloadQueue: state.downloadQueue.map((item) =>
          item.albumId === waitingItem.albumId ? { ...item, status: 'downloading' } : item
        ),
      }));
      return waitingItem.albumId;
    }
    return null;
  },

  getQueuePosition: (albumId) => {
    const state = get();
    return state.downloadQueue.findIndex(item => item.albumId === albumId);
  },
}));

export default useAlbumStore;