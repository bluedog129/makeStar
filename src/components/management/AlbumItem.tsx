import React, { useState } from "react";
import styled from "styled-components";
import { Album } from "../../types/album";
import { formatDate } from "../../utils/date";
import smkebabIcon from "../../assets/images/smKebab.png";
import SelectForm from "./SelectForm";
import { getDownloadInfo } from "../../api/album";
import DownloadProgress from "./DownloadProgress";

const AlbumItemContainer = styled.div`
  width: 100%;
  height: 85px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 16px;
  margin-bottom: 16px;
`;

const AlbumImage = styled.div`
  width: 54px;
  height: 85px;
  overflow: hidden;
  border-radius: 4px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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

interface DownloadState {
  isDownloading: boolean;
  current: number;
  total: number;
}

const AlbumItem = ({ album }: AlbumItemProps) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [downloadState, setDownloadState] = useState<DownloadState>({
    isDownloading: false,
    current: 0,
    total: 0,
  });

  const handleDownload = async () => {
    try {
      setDownloadState({
        isDownloading: true,
        current: 0,
        total: 100, // 임시로 100으로 설정
      });

      // 다운로드 진행 상태를 시뮬레이션 (실제 구현 시 API 응답으로 대체)
      const simulateProgress = () => {
        setDownloadState((prev) => {
          if (prev.current >= prev.total) {
            clearInterval(progressInterval);
            return prev;
          }
          return {
            ...prev,
            current: prev.current + 1,
          };
        });
      };

      const progressInterval = setInterval(simulateProgress, 50);

      const downloadInfo = await getDownloadInfo(album.id);

      // 로컬 스토리지에 다운로드 정보 저장
      const storageKey = album.title;
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          ...downloadInfo,
          savedAt: new Date().toISOString(),
        })
      );

      clearInterval(progressInterval);
      setDownloadState((prev) => ({
        ...prev,
        current: prev.total,
      }));

      // 다운로드 완료 후 상태 초기화 (약간의 딜레이 후)
      setTimeout(() => {
        setDownloadState({
          isDownloading: false,
          current: 0,
          total: 0,
        });
      }, 500);
    } catch (error) {
      console.error("Error handling download:", error);
      setDownloadState({
        isDownloading: false,
        current: 0,
        total: 0,
      });
    }
  };

  const handleCancelDownload = () => {
    setDownloadState({
      isDownloading: false,
      current: 0,
      total: 0,
    });
  };

  const handleDelete = () => {
    console.log("Delete album:", album.id);
  };

  const coverImage =
    album.published_album_list?.[0]?.box_image_url || album.coverImage;
  const publishedCount = album.published_album_list?.length || 0;

  return (
    <AlbumItemContainer>
      <AlbumImage>
        <img src={coverImage} alt={album.title} />
      </AlbumImage>
      <AlbumInfo>
        <TitleContainer>
          <Title>{album.title}</Title>
          <MenuButton onClick={(e) => {
            e.stopPropagation();
            setIsSelectOpen(true);
          }}>
            <MenuIcon src={smkebabIcon} alt="메뉴" />
            <SelectForm
              isOpen={isSelectOpen}
              onClose={() => setIsSelectOpen(false)}
              onDownload={handleDownload}
              onDelete={handleDelete}
            />
          </MenuButton>
        </TitleContainer>
        {downloadState.isDownloading ? (
          <DownloadProgress
            current={downloadState.current}
            total={downloadState.total}
            onCancel={handleCancelDownload}
          />
        ) : (
          <>
            <SubInfo>
              <span>{album.artist?.name}</span>
              <Dot>•</Dot>
              <span>{formatDate(album.released_at)}</span>
            </SubInfo>
            <Count>수량 {publishedCount}</Count>
          </>
        )}
      </AlbumInfo>
    </AlbumItemContainer>
  );
};

export default AlbumItem;
