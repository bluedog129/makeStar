import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import useAlbumStore from '../../store/albumStore';
import sortingIcon from '../../assets/images/sorting.png';
import AlbumItem from './AlbumItem';
import SortBottomSheet from './SortBottomSheet';

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

const AlbumListContainer = () => {
  const { albums } = useAlbumStore();
  const [isSortSheetOpen, setIsSortSheetOpen] = useState(false);
  const [sortType, setSortType] = useState<'latest' | 'name'>('latest');

  const sortedAlbums = useMemo(() => {
    const albumsCopy = [...albums];
    
    if (sortType === 'latest') {
      return albumsCopy.sort((a, b) => {
        const dateA = new Date(a.released_at).getTime();
        const dateB = new Date(b.released_at).getTime();
        return dateB - dateA; // 최신순 정렬
      });
    } else {
      return albumsCopy.sort((a, b) => {
        // 한글 정규식
        const koreanPattern = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        const isKoreanA = koreanPattern.test(a.title.charAt(0));
        const isKoreanB = koreanPattern.test(b.title.charAt(0));

        // 둘 다 한글이거나 둘 다 영어인 경우
        if ((isKoreanA && isKoreanB) || (!isKoreanA && !isKoreanB)) {
          return a.title.localeCompare(b.title, 'ko-KR');
        }
        
        // 한글 우선 정렬
        return isKoreanA ? -1 : 1;
      });
    }
  }, [albums, sortType]);

  const handleSort = (newSortType: 'latest' | 'name') => {
    setSortType(newSortType);
    setIsSortSheetOpen(false);
  };

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
        <SortButton onClick={() => setIsSortSheetOpen(true)}>
          <SortIcon src={sortingIcon} alt="정렬" />
          <SortText>순서변경</SortText>
        </SortButton>
      </SummaryContainer>
      {sortedAlbums.map((album) => (
        <AlbumItem key={album.id} album={album} />
      ))}
      <SortBottomSheet 
        isOpen={isSortSheetOpen}
        onClose={() => setIsSortSheetOpen(false)}
        onSort={handleSort}
      />
    </Container>
  );
};

export default AlbumListContainer;