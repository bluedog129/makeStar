import React, { useEffect, useState } from 'react';
import { getOwnAlbumList } from '../api/album';
import { AlbumListResponse } from '../types/album';
import PocaAlbumInfo from './PocaAlbumInfo';
import AlbumSwiper from './AlbumSwiper';
import { Container, LoadingText, ErrorText } from '../styles/PocaAlbumContainer.styles';
import { mockAlbumData } from '../mocks/albumData';

const PocaAlbumContainer = () => {
  const [albumData, setAlbumData] = useState<AlbumListResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        setLoading(true);
        const data = await getOwnAlbumList();
        setAlbumData(data);
      } catch (err) {
        console.error('API 호출 실패, 더미 데이터를 사용합니다:', err);
        setAlbumData(mockAlbumData);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumData();
  }, []);

  if (loading) {
    return <LoadingText>로딩 중...</LoadingText>;
  }

  if (!albumData || !albumData.result) {
    return <ErrorText>앨범 정보가 없습니다.</ErrorText>;
  }

  const albums = albumData.album_list;
  if (albums.length === 0) {
    return <ErrorText>앨범 정보가 없습니다.</ErrorText>;
  }

  const currentAlbum = albums[currentIndex];

  return (
    <Container>
      <AlbumSwiper 
        albums={albums}
        onSlideChange={setCurrentIndex}
      />
      <PocaAlbumInfo 
        title={currentAlbum.title}
        artist={currentAlbum.artist?.name || ''}
        releasedAt={currentAlbum.released_at || ''}
      />
    </Container>
  );
};

export default PocaAlbumContainer; 