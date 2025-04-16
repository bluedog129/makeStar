import { InfoContainer, Title, Artist, ReleasedAt } from '../styles/PocaAlbumInfo.styles';
import { formatDate } from '../utils/date';

interface PocaAlbumInfoProps {
  title: string;
  artist: string;
  releasedAt: string;
}

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