import React, { useState, useRef } from "react";
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

  // 취소 플래그와 인터벌 참조를 useRef로 생성
  const isCancelledRef = useRef(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleDownload = async () => {
    // 새로운 다운로드 시작 시 취소 플래그 초기화
    isCancelledRef.current = false;
    setDownloadState({
      isDownloading: true,
      current: 0,
      total: 100, // 시뮬레이션 용 값이며 실제 값으로 수정 가능
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

      // API 호출 후 취소 여부 확인
      if (isCancelledRef.current) {
        console.log("다운로드가 취소되어 로컬 저장을 생략합니다.");
        return;
      }

      // 로컬 스토리지에 앨범 정보 저장
      const storageKey = `${album.title}_${album.id}`;
      localStorage.setItem(storageKey, JSON.stringify(album));

      // 진행률 인터벌 종료
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      
      // 진행률을 최대로 설정
      setDownloadState((prev) => ({
        ...prev,
        current: prev.total,
      }));

      // 다운로드 완료 후 약간의 지연 후 상태 초기화
      setTimeout(() => {
        setDownloadState({
          isDownloading: false,
          current: 0,
          total: 0,
        });
      }, 500);
    } catch (error) {
      console.error("다운로드 처리 중 오류 발생:", error);
      // 에러 발생 시 인터벌 종료 후 상태 초기화
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      setDownloadState({
        isDownloading: false,
        current: 0,
        total: 0,
      });
    }
  };

  const handleCancelDownload = () => {
    // 취소 버튼 클릭 시 취소 플래그를 true로 설정
    isCancelledRef.current = true;
    // 진행 중인 인터벌 종료
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    // 다운로드 상태 초기화
    setDownloadState({
      isDownloading: false,
      current: 0,
      total: 0,
    });
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
