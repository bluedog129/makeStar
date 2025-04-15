import React, { useState } from "react";
import styled from "styled-components";
import { Album } from "../../types/album";
import { formatDate } from "../../utils/date";
import smkebabIcon from "../../assets/images/smKebab.png";
import SelectForm from "./SelectForm";
import { getDownloadInfo } from "../../api/album";

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
  color: #6c6c6c;
`;

const Dot = styled.span`
  color: #6c6c6c;
`;

const Count = styled.span`
  font-size: 11px;
  color: #a5a5a5;
`;

interface AlbumItemProps {
  album: Album;
}

const AlbumItem = ({ album }: AlbumItemProps) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleDownload = async () => {
    try {
      const downloadInfo = await getDownloadInfo(album.id);
      
      // 로컬 스토리지에 다운로드 정보 저장
      const storageKey = `album_download_${album.id}`;
      localStorage.setItem(storageKey, JSON.stringify({
        ...downloadInfo,
        savedAt: new Date().toISOString(),
      }));

      console.log('Download info saved for album:', album.id);
    } catch (error) {
      console.error('Error handling download:', error);
    }
  };

  const handleDelete = () => {
    console.log("Delete album:", album.id);
  };

  const publishedCount = album.published_album_list?.length || 0;
  const coverImage =
    album.published_album_list?.[0]?.box_image_url || album.coverImage;

  return (
    <AlbumItemContainer>
      <AlbumImage src={coverImage} alt={album.title} />
      <AlbumInfo>
        <TitleContainer>
          <Title>{album.title}</Title>
          <MenuButton onClick={() => setIsSelectOpen(true)}>
            <MenuIcon src={smkebabIcon} alt="메뉴" />
            <SelectForm
              isOpen={isSelectOpen}
              onClose={() => setIsSelectOpen(false)}
              onDownload={handleDownload}
              onDelete={handleDelete}
            />
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
