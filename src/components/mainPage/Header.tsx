import { HeaderContainer, TitleWrapper, AlbumManageButton } from '../../styles/Header.styles';
import { useNavigate } from 'react-router-dom';
import useAlbumStore from '../../store/albumStore';
import { useState } from 'react';
import NotificationMessage from '../common/NotificationMessage';

const Header = () => {
  const navigate = useNavigate();
  const { albums } = useAlbumStore();
  const [showNotification, setShowNotification] = useState(false);

  const handleAlbumManageClick = () => {
    if (albums.length === 0) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      return;
    }
    navigate('/management');
  };

  return (
    <HeaderContainer>
      <TitleWrapper>
        <h1>앨범</h1>
        <AlbumManageButton onClick={handleAlbumManageClick}>
          앨범관리
        </AlbumManageButton>
      </TitleWrapper>
      {showNotification && (
        <NotificationMessage 
          message="보유하신 앨범이 없습니다."
          onClose={() => setShowNotification(false)}
          position="top"
        />
      )}
    </HeaderContainer>
  );
};

export default Header; 