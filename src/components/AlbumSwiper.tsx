import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Album } from '../types/album';
import {
  StyledSwiperContainer,
  AlbumCard,
  AlbumImage,
  UpdateBadge,
  GradientBackground
} from '../styles/AlbumSwiper.styles';

// Import Swiper styles
import 'swiper/css';

// Import PNG files
import newjeans from '../assets/images/newjeans.png';
import aespa from '../assets/images/aespa.png';
import ive from '../assets/images/ive.png';
import lesserafim from '../assets/images/lesserafim.png';
import seventeen from '../assets/images/seventeen.png';

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
