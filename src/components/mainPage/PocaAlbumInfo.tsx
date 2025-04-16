import { InfoContainer, Title, Artist, ReleasedAt } from '@/styles/PocaAlbumInfo.styles';
import { formatDate } from '@/utils/date';
import { PocaAlbumInfoProps } from '@/types/props';

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