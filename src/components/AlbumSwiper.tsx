import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import styled from 'styled-components';
import { Album } from '../types/album';

// Import Swiper styles
import 'swiper/css';

// Import PNG files
import newjeans from '../assets/images/newjeans.png';
import aespa from '../assets/images/aespa.png';
import ive from '../assets/images/ive.png';
import lesserafim from '../assets/images/lesserafim.png';
import seventeen from '../assets/images/seventeen.png';

const StyledSwiperContainer = styled.div`
  width: 100%;
  max-width: 600px;
  position: relative;

  .swiper {
    width: 100%;
    height: 100%;
    padding: 50px 20px;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.4s ease;
    transform: scale(0.8);
  }

  .swiper-slide-active {
    opacity: 1;
    transform: scale(1.3);
    z-index: 2;
  }
`;

const AlbumCard = styled.div`
  width: 100%;
  max-width: 280px;
  border-radius: 10px;
  overflow: visible; // 중요: 효과가 밖으로 나가도록 변경
  position: relative;
  background-color: white;
              
  /* 앨범 이미지 양쪽에 그라데이션 효과 추가 */
  &::before, &::after {
    content: '';
    position: absolute;
    top: 5%;
    height: 90%;
    width: 20px;
    z-index: -1;
    filter: blur(10px);
  }
  
  /* 왼쪽 그라데이션 */
  &::before {
    left: -15px;
    background: linear-gradient(to right, transparent, rgba(178, 223, 255, 0.7));
  }
  
  /* 오른쪽 그라데이션 */
  &::after {
    right: -15px;
    background: linear-gradient(to left, transparent, rgba(255, 200, 240, 0.7));
  }
`;

const AlbumImage = styled.div`
  width: 100%;
  height: 280px;
  display: block;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
  }
  
  /* 이미지 주변에 살짝 흐릿한 글로우 효과 */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 0 30px 5px rgba(200, 220, 255, 0.5) inset;
    pointer-events: none;
  }
`;

const UpdateBadge = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: #FF0099;
  color: white;
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  z-index: 1;
`;

const GradientBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  border-radius: 15px;
`;

// Album data using project PNG files
const albumData: Album[] = [
  {
    id: 1,
    title: 'NewJeans Album',
    coverImage: newjeans,
    isUpdate: true,
    version_code: 1,
    count: 1,
    published_album_list: [],
    artist: {
      id: 1,
      name: 'NewJeans',
    },
    released_at: '2024.03.01',
  },
  {
    id: 2,
    title: 'Aespa Album',
    coverImage: aespa,
    isUpdate: false,
    version_code: 1,
    count: 1,
    published_album_list: [],
    artist: {
      id: 2,
      name: 'Aespa',
    },
    released_at: '2024.03.01',
  },
  {
    id: 3,
    title: 'IVE Album',
    coverImage: ive,
    isUpdate: true,
    version_code: 1,
    count: 1,
    published_album_list: [],
    artist: {
      id: 3,
      name: 'IVE',
    },
    released_at: '2024.03.01',
  },
  {
    id: 4,
    title: 'LE SSERAFIM Album',
    coverImage: lesserafim,
    isUpdate: false,
    version_code: 1,
    count: 1,
    published_album_list: [],
    artist: {
      id: 4,
      name: 'LE SSERAFIM',
    },
    released_at: '2024.03.01',
  },
  {
    id: 5,
    title: 'Seventeen Album',
    coverImage: seventeen,
    isUpdate: true,
    version_code: 1,
    count: 1,
    published_album_list: [],
    artist: {
      id: 5,
      name: 'Seventeen',
    },
    released_at: '2024.03.01',
  },
];

interface AlbumSwiperProps {
  albums?: Album[];
  onSlideChange?: (index: number) => void;
}

const AlbumSwiper = ({
  albums = albumData,
  onSlideChange,
}: AlbumSwiperProps) => {
  const handleSlideChange = (swiper: SwiperType) => {
    if (onSlideChange) {
      onSlideChange(swiper.activeIndex);
    }
  };

  return (
    <StyledSwiperContainer>
      <GradientBackground />

      <Swiper
        slidesPerView={1.5}
        spaceBetween={30}
        centeredSlides={true}
        initialSlide={0}
        watchSlidesProgress={true}
        loop={false}
        onSlideChange={handleSlideChange}
        className="mySwiper"
      >
        {albums.map((album) => (
          <SwiperSlide key={album.id}>
            <AlbumCard>
              <AlbumImage>
                <img src={typeof album.coverImage === 'object' ? album.coverImage.default : album.coverImage} alt={album.title} />
              </AlbumImage>
              {album.isUpdate && <UpdateBadge>UPDATE</UpdateBadge>}
            </AlbumCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledSwiperContainer>
  );
};

export default AlbumSwiper;
