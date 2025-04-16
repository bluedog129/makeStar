import { useState, useMemo } from 'react';
import useAlbumStore from '@/store/albumStore';
import sortingIcon from '@/assets/images/sorting.png';
import AlbumItem from '@/components/management/AlbumItem';
import SortBottomSheet from '@/components/management/SortBottomSheet';
import {
  Container,
  SummaryContainer,
  CountContainer,
  TotalCount,
  PublishedCount,
  SortButton,
  SortIcon,
  SortText,
} from '@/styles/AlbumListContainer.styles';

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
          <TotalCount>
            전체 {albums.length} 
          </TotalCount>
          <PublishedCount>
            (타입 {albums.reduce((sum, album) => sum + album.version_code, 0)} · 수량 {totalPublishedCount})
          </PublishedCount>
        </CountContainer>
        <SortButton 
          onClick={() => {
            setIsSortSheetOpen(true);
          }}
        >
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