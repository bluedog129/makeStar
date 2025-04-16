import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Album } from '../../types/album';
import {
  StyledSwiperContainer,
  AlbumCard,
  AlbumImage,
  UpdateBadge,
  GradientBackground
} from '../../styles/AlbumSwiper.styles';
import { mockAlbumData } from '../../mocks/albumData';

// Import Swiper styles
import 'swiper/css';

// Import PNG files
import newjeans from '../../assets/images/newjeans.png';
import aespa from '../../assets/images/aespa.png';
import ive from '../../assets/images/ive.png';
import lesserafim from '../../assets/images/lesserafim.png';
import seventeen from '../../assets/images/seventeen.png';

// Map images to albums
const albumImages = {
  1: newjeans,
  2: seventeen,
  3: lesserafim,
  4: ive,
  5: aespa,
};

interface AlbumSwiperProps {
  albums?: Album[];
  onSlideChange?: (index: number) => void;
}

const AlbumSwiper = ({
  albums = mockAlbumData.album_list.map(album => ({
    ...album,
    coverImage: albumImages[album.id as keyof typeof albumImages] || newjeans
  })),
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