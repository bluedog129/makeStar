import React from 'react';
import { InfoContainer, Title, Artist, ReleasedAt } from '../styles/PocaAlbumInfo.styles';

interface PocaAlbumInfoProps {
  title: string;
  artist: string;
  releasedAt: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\. /g, '.').slice(0, -1);
};

const PocaAlbumInfo = ({ title, artist, releasedAt }: PocaAlbumInfoProps) => {
  return (
    <InfoContainer>
      <Title>{title}</Title>
      <Artist>{artist}</Artist>
      <ReleasedAt>{formatDate(releasedAt)}</ReleasedAt>
    </InfoContainer>
  );
};

export default PocaAlbumInfo; 