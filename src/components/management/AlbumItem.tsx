import React, { useState } from 'react';
import styled from 'styled-components';
import { Album } from '../../types/album';
import { formatDate } from '../../utils/date';
import smkebabIcon from '../../assets/images/smKebab.png';
import SelectForm from './SelectForm';

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
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  position: relative;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleDownload = () => {
    // 여기서 testGetDownloadInfo 함수를 호출할 수 있습니다
    console.log('Download album:', album.id);
  };

  const handleDelete = () => {
    console.log('Delete album:', album.id);
  };

  const publishedCount = album.published_album_list?.length || 0;
  const coverImage = album.published_album_list?.[0]?.box_image_url || album.coverImage;

  return (
    <AlbumItemContainer>
      <AlbumImage src={coverImage} alt={album.title} />
      <AlbumInfo>
        <TitleContainer>
          <Title>{album.title}</Title>
          <MenuButton onClick={() => setIsSelectOpen(true)}>
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
      <SelectForm
        isOpen={isSelectOpen}
        onClose={() => setIsSelectOpen(false)}
        onDownload={handleDownload}
        onDelete={handleDelete}
      />
    </AlbumItemContainer>
  );
};

export default AlbumItem; 