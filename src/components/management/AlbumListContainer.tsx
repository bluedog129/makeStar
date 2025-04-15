import React from 'react';
import styled from 'styled-components';
import useAlbumStore from '../../store/albumStore';

const Container = styled.div`
  width: 100%;
  flex: 1;
  min-height: 0;
  background-color: white;
  padding: 20px;
  overflow-y: auto;
`;

const TestText = styled.div`
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const AlbumListContainer = () => {
  const { albums } = useAlbumStore();

  console.log('Store에 저장된 앨범 데이터:', albums);

  return (
    <Container>
      <TestText>
        Store에 저장된 앨범 수: {albums.length}
      </TestText>
      {albums.map((album) => (
        <TestText key={album.id}>
          ID: {album.id}<br />
          제목: {album.title}<br />
          아티스트: {album.artist?.name}<br />
          발매일: {album.released_at}<br />
          버전: {album.version_code}
        </TestText>
      ))}
    </Container>
  );
};

export default AlbumListContainer; 