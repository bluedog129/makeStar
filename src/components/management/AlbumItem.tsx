import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { formatDate } from "../../utils/date";
import { getImageSource } from "../../utils/image";
import smkebabIcon from "../../assets/images/smKebab.png";
import SelectForm from "./SelectForm";
import { getDownloadInfo } from "../../api/album";
import DownloadProgress from "./DownloadProgress";
import useAlbumStore from "../../store/albumStore";
import NotificationMessage from "../common/NotificationMessage";
import {
  AlbumItemProps,
  DownloadState,
  StyledAlbumProps,
  AlbumInfoStyleProps,
  SubInfoStyleProps,
  CountStyleProps
} from "../../types/props";

const AlbumItemContainer = styled.div`
  width: 100%;
  height: 85px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 16px;
  margin-bottom: 16px;
`;

const Title = styled.span`
  font-size: 14px;
  color: #000000;
`;

const SubInfo = styled.div<SubInfoStyleProps>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: ${(props) => (props.$isInactive ? "#A5A5A5" : "#6c6c6c")};
`;

const Count = styled.span<CountStyleProps>`
  font-size: 11px;
  color: ${(props) => (props.$isInactive ? "#A5A5A5" : "#a5a5a5")};
`;

const AlbumImage = styled.div<StyledAlbumProps>`
  width: 54px;
  height: 85px;
  overflow: hidden;
  border-radius: 4px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${(props) =>
      props.$isInactive ? "rgba(0, 0, 0, 0.7)" : "transparent"};
  }
`;

const AlbumInfo = styled.div<AlbumInfoStyleProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;

  ${Title} {
    color: ${(props) => (props.$isInactive ? "#A5A5A5" : "#000000")};
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuButton = styled.div`
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

const Dot = styled.span`
  color: #6c6c6c;
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
  border-bottom-color: #ff0099;
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
  color: #6c6c6c;
  display: flex;
  align-items: center;
`;

const AlbumItem = ({ album }: AlbumItemProps) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [downloadState, setDownloadState] = useState<DownloadState>({
    isDownloading: false,
    current: 0,
    total: 0,
    totalSize: undefined,
  });
  const [notification, setNotification] = useState<{
    message: string;
    visible: boolean;
  }>({
    message: "",
    visible: false,
  });

  const {
    addToDownloadQueue,
    removeFromDownloadQueue,
    isDownloading,
    isInQueue,
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
      totalSize: undefined,
    });

    try {
      const downloadInfo = await getDownloadInfo(album.id);
      const contentLength = downloadInfo.headers.get("Content-Length");
      const totalSizeMB = contentLength
        ? Number((parseInt(contentLength) / 1024 / 1024).toFixed(2))
        : undefined;

      if (isCancelledRef.current) {
        console.log("다운로드가 취소되어 로컬 저장을 생략합니다.");
        return;
      }

      setDownloadState((prev) => ({
        ...prev,
        totalSize: totalSizeMB,
        current: 30, // API 응답 받은 후 30%로 설정
      }));

      // 진행률을 30%에서 60%까지 서서히 증가
      progressIntervalRef.current = setInterval(() => {
        setDownloadState((prev) => {
          const nextProgress = prev.current + 1;
          if (nextProgress >= 60) {
            if (progressIntervalRef.current) {
              clearInterval(progressIntervalRef.current);
            }
          }
          return {
            ...prev,
            current: Math.min(nextProgress, 60),
          };
        });
      }, 50);

      // 로컬 스토리지에 저장
      const storageKey = `${album.title}_${album.id}`;
      localStorage.setItem(storageKey, JSON.stringify(album));

      // 저장 완료 후 진행률 100%로 설정
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }

      // 60%에서 100%까지 빠르게 증가
      progressIntervalRef.current = setInterval(() => {
        setDownloadState((prev) => {
          const nextProgress = prev.current + 2;
          if (nextProgress >= 100) {
            if (progressIntervalRef.current) {
              clearInterval(progressIntervalRef.current);
            }
            return {
              ...prev,
              current: 100,
            };
          }
          return {
            ...prev,
            current: nextProgress,
          };
        });
      }, 30);

      // 100% 도달 후 잠시 대기했다가 상태 초기화
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 다운로드 완료 후 상태 초기화
      setDownloadState({
        isDownloading: false,
        current: 0,
        total: 0,
        totalSize: undefined,
      });

      // 현재 다운로드를 큐에서 제거하고 다음 다운로드 시작
      removeFromDownloadQueue(album.id);
    } catch (error) {
      console.error("다운로드 처리 중 오류 발생:", error);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      setDownloadState({
        isDownloading: false,
        current: 0,
        total: 0,
        totalSize: undefined,
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

    // 이미 로컬 스토리지에 있는 경우 알림 표시
    if (isInLocalStorage()) {
      setNotification({
        message: "이미 다운로드된 앨범입니다.",
        visible: true,
      });
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
      totalSize: undefined,
    });
    removeFromDownloadQueue(album.id);
  };

  const handleDelete = () => {
    // 로컬 스토리지에 없는 경우 알림 표시
    if (!isInLocalStorage()) {
      setNotification({
        message: "다운로드되지 않은 앨범입니다.",
        visible: true,
      });
      return;
    }

    // 로컬 스토리지에서 해당 앨범 데이터 삭제
    const storageKey = `${album.title}_${album.id}`;
    localStorage.removeItem(storageKey);
  };

  const isInLocalStorage = () => {
    const storageKey = `${album.title}_${album.id}`;
    return localStorage.getItem(storageKey) !== null;
  };

  const coverImage =
    album.published_album_list?.[0]?.box_image_url || album.coverImage;
  const publishedCount = album.published_album_list?.length || 0;

  return (
    <>
      <AlbumItemContainer>
        <AlbumImage $isInactive={!isInLocalStorage()}>
          <img src={getImageSource(coverImage)} alt={album.title} />
        </AlbumImage>
        <AlbumInfo $isInactive={!isInLocalStorage()}>
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
              totalSize={downloadState.totalSize}
              onCancel={handleCancelDownload}
            />
          ) : isInQueue(album.id) && !isDownloading(album.id) ? (
            <WaitingContainer>
              <Spinner />
              <WaitingText>대기중</WaitingText>
            </WaitingContainer>
          ) : (
            <>
              <SubInfo $isInactive={!isInLocalStorage()}>
                <span>{album.artist?.name}</span>
                <Dot>•</Dot>
                <span>{formatDate(album.released_at)}</span>
              </SubInfo>
              <Count $isInactive={!isInLocalStorage()}>
                타입 {album.version_code} · 수량 {publishedCount}
              </Count>
            </>
          )}
        </AlbumInfo>
      </AlbumItemContainer>
      {notification.visible && (
        <NotificationMessage
          message={notification.message}
          onClose={() => setNotification({ ...notification, visible: false })}
        />
      )}
    </>
  );
};

export default AlbumItem;
