import React from 'react';
import styled from 'styled-components';
import useAlbumStore from '../../store/albumStore';
import sortingIcon from '../../assets/images/sorting.png';
import smkebabIcon from '../../assets/images/smkebab.png';
import { Album } from '../../types/album';

const Container = styled.div`
  width: 100%;
  flex: 1;
  min-height: 0;
  background-color: white;
  overflow-y: auto;
`;

const SummaryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const CountContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TotalCount = styled.span`
  font-size: 14px;
  color: #6C6C6C;
`;

const PublishedCount = styled.span`
  font-size: 13px;
  color: #A5A5A5;
  margin-left: 4px;
`;

const SortButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
`;

const SortIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const SortText = styled.span`
  font-size: 14px;
  color: #6C6C6C;
`;

const AlbumItemContainer = styled.div`
  width: 100%;
  height: 85px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 16px;
  margin-bottom: 16px;
`;

const AlbumImage = styled.img`
  width: 54px;
  height: 85px;
  object-fit: cover;
`;

const AlbumInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.span`
  font-size: 14px;
  color: #000000;
`;

const MenuButton = styled.button`
  width: 20px;
  height: 20px;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
`;

const MenuIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const SubInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #6C6C6C;
`;

const Dot = styled.span`
  color: #6C6C6C;
`;

const Count = styled.span`
  font-size: 11px;
  color: #A5A5A5;
`;

interface AlbumItemProps {
  album: Album;
}

const AlbumItem = ({ album }: AlbumItemProps) => {
  const publishedCount = album.published_album_list?.length || 0;
  const coverImage = album.published_album_list?.[0]?.box_image_url || album.coverImage;

  return (
    <AlbumItemContainer>
      <AlbumImage src={coverImage} alt={album.title} />
      <AlbumInfo>
        <TitleContainer>
          <Title>{album.title}</Title>
          <MenuButton>
            <MenuIcon src={smkebabIcon} alt="메뉴" />
          </MenuButton>
        </TitleContainer>
        <SubInfo>
          <span>{album.artist?.name}</span>
          <Dot>•</Dot>
          <span>{album.released_at}</span>
        </SubInfo>
        <Count>수량 {publishedCount}</Count>
      </AlbumInfo>
    </AlbumItemContainer>
  );
};

const AlbumListContainer = () => {
  const { albums } = useAlbumStore();

  // published_album_list의 총 개수 계산
  const totalPublishedCount = albums.reduce((sum, album) => {
    return sum + (album.published_album_list?.length || 0);
  }, 0);

  return (
    <Container>
      <SummaryContainer>
        <CountContainer>
          <TotalCount>전체 {albums.length}</TotalCount>
          <PublishedCount>(수량 {totalPublishedCount})</PublishedCount>
        </CountContainer>
        <SortButton>
          <SortIcon src={sortingIcon} alt="정렬" />
          <SortText>순서변경</SortText>
        </SortButton>
      </SummaryContainer>
      {albums.map((album) => (
        <AlbumItem key={album.id} album={album} />
      ))}
    </Container>
  );
};

export default AlbumListContainer;