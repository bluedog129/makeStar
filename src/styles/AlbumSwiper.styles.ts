import styled from 'styled-components';

export const StyledSwiperContainer = styled.div`
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

export const AlbumCard = styled.div`
  width: 100%;
  max-width: 280px;
  aspect-ratio: 1/1.5;
  border-radius: 8px;
  overflow: visible;
  position: relative;
  background-color: white;

  /* 앨범 이미지 양쪽에 그라데이션 효과 추가 */
  &::before, &::after {
    content: '';
    position: absolute;
    top: 5%;
    height: 90%;
    width: 30px;
    z-index: -1;
    filter: blur(15px);
  }
  
  /* 왼쪽 그라데이션 */
  &::before {
    left: -20px;
    background: linear-gradient(to right, transparent, rgba(178, 223, 255, 0.7));
  }
  
  /* 오른쪽 그라데이션 */
  &::after {
    right: -20px;
    background: linear-gradient(to left, transparent, rgba(255, 200, 240, 0.7));
  }
`;

export const AlbumImage = styled.div`
  border-radius: 8px;
  width: 100%;
  height: 100%;
  display: block;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    border-radius: 8px;
  }
`;

export const UpdateBadge = styled.div`
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

export const GradientBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  border-radius: 15px;
`;
