import React from 'react';
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
    padding: 40px 20px;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
    opacity: 0.4;
    transform: scale(0.85);
  }

  .swiper-slide-active {
    opacity: 1;
    transform: scale(1);
    z-index: 2;
  }
`;

const AlbumCard = styled.div`
  width: 100%;
  max-width: 280px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  background-color: white;
`;

const AlbumImage = styled.div`
  width: 100%;
  height: 280px;
  display: block;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
  }
`;

const UpdateBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #e94e8a;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const GradientBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #e8f6ff 0%, #ffebfd 100%);
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
                <img src={album.coverImage} alt={album.title} />
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
