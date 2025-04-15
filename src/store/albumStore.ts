import { create } from 'zustand';
import { Album } from '../types/album';

interface AlbumStore {
  albums: Album[];
  setAlbums: (albums: Album[]) => void;
  addAlbum: (album: Album) => void;
  updateAlbum: (id: number, updates: Partial<Album>) => void;
  removeAlbum: (id: number) => void;
}

const useAlbumStore = create<AlbumStore>((set) => ({
  albums: [],
  setAlbums: (albums) => set({ albums }),
  addAlbum: (album) => set((state) => ({ 
    albums: [...state.albums, album] 
  })),
  updateAlbum: (id, updates) => set((state) => ({
    albums: state.albums.map((album) => 
      album.id === id ? { ...album, ...updates } : album
    )
  })),
  removeAlbum: (id) => set((state) => ({
    albums: state.albums.filter((album) => album.id !== id)
  })),
}));

export default useAlbumStore;