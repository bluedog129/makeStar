import { HeaderContainer, TitleWrapper, AlbumManageButton } from '../styles/Header.styles';
import { useNavigate } from 'react-router-dom';
import useAlbumStore from '../store/albumStore';
import { NotificationMessage } from '../styles/PocaAlbumContainer.styles';
import { useState } from 'react';
import styled from 'styled-components';

const TopNotificationMessage = styled(NotificationMessage)`
  top: 6%;
  bottom: auto;
`;

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
        <TopNotificationMessage>
          보유하신 앨범이 없습니다.
        </TopNotificationMessage>
      )}
    </HeaderContainer>
  );
};

export default Header;