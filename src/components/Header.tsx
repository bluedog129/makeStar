import { HeaderContainer, TitleWrapper, AlbumManageButton } from '../styles/Header.styles';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <TitleWrapper>
        <h1>앨범</h1>
        <AlbumManageButton onClick={() => navigate('/management')}>
          앨범관리
        </AlbumManageButton>
      </TitleWrapper>
    </HeaderContainer>
  );
};

export default Header;