import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Album } from "../../types/album";
import { formatDate } from "../../utils/date";
import smkebabIcon from "../../assets/images/smKebab.png";
import SelectForm from "./SelectForm";
import { getDownloadInfo } from "../../api/album";
import DownloadProgress from "./DownloadProgress";
import useAlbumStore from "../../store/albumStore";

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

const WaitingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-bottom-color: #FF0099;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const WaitingText = styled.span`
  font-size: 11px;
  font-weight: bold;
  color: #6C6C6C;
  display: flex;
  align-items: center;
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

  const { 
    addToDownloadQueue, 
    removeFromDownloadQueue, 
    isDownloading, 
    isInQueue,
    startNextDownload,
    getQueuePosition 
  } = useAlbumStore();

  const isCancelledRef = useRef(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 이 앨범이 다운로드 중이면 다운로드 시작
    if (isDownloading(album.id)) {
      startDownload();
    }
  }, [isDownloading(album.id)]);

  const startDownload = async () => {
    // 새로운 다운로드 시작 시 취소 플래그 초기화
    isCancelledRef.current = false;
    setDownloadState({
      isDownloading: true,
      current: 0,
      total: 100,
    });

    // 진행률 업데이트 함수
    const simulateProgress = () => {
      setDownloadState((prev) => {
        if (prev.current >= prev.total) {
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
          }
          return prev;
        }
        return {
          ...prev,
          current: prev.current + 1,
        };
      });
    };

    // 진행률 업데이트를 위해 50ms마다 실행되는 인터벌 시작
    progressIntervalRef.current = setInterval(simulateProgress, 50);

    try {
      const downloadInfo = await getDownloadInfo(album.id);

      if (isCancelledRef.current) {
        console.log("다운로드가 취소되어 로컬 저장을 생략합니다.");
        return;
      }

      const storageKey = `${album.title}_${album.id}`;
      localStorage.setItem(storageKey, JSON.stringify(album));

      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      
      setDownloadState((prev) => ({
        ...prev,
        current: prev.total,
      }));

      // 다운로드 완료 후 상태 초기화
      setTimeout(() => {
        setDownloadState({
          isDownloading: false,
          current: 0,
          total: 0,
        });
        // 현재 다운로드를 큐에서 제거하고 다음 다운로드 시작
        removeFromDownloadQueue(album.id);
      }, 500);
    } catch (error) {
      console.error("다운로드 처리 중 오류 발생:", error);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      setDownloadState({
        isDownloading: false,
        current: 0,
        total: 0,
      });
      // 에러 발생 시 현재 다운로드를 큐에서 제거하고 다음 다운로드 시작
      removeFromDownloadQueue(album.id);
    }
  };

  const handleDownload = () => {
    // 이미 다운로드 중이거나 대기 중이면 무시
    if (isInQueue(album.id)) {
      return;
    }

    // 다운로드 큐에 추가
    addToDownloadQueue(album.id);
  };

  const handleCancelDownload = () => {
    isCancelledRef.current = true;
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    setDownloadState({
      isDownloading: false,
      current: 0,
      total: 0,
    });
    removeFromDownloadQueue(album.id);
  };

  const handleDelete = () => {
    // 로컬 스토리지에서 해당 앨범 데이터 삭제
    const storageKey = `${album.title}_${album.id}`;
    localStorage.removeItem(storageKey);
    console.log("앨범 삭제:", album.id);
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
          <MenuButton
            onClick={(e) => {
              e.stopPropagation();
              setIsSelectOpen(true);
            }}
          >
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
        ) : isInQueue(album.id) && !isDownloading(album.id) ? (
          <WaitingContainer>
            <Spinner />
            <WaitingText>대기중</WaitingText>
          </WaitingContainer>
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
