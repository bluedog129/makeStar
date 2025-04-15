import React from 'react';
import styled from 'styled-components';
import { Album } from '../../types/album';
import { formatDate } from '../../utils/date';
import smkebabIcon from '../../assets/images/smkebab.png';

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
          <span>{formatDate(album.released_at)}</span>
        </SubInfo>
        <Count>수량 {publishedCount}</Count>
      </AlbumInfo>
    </AlbumItemContainer>
  );
};

export default AlbumItem; 