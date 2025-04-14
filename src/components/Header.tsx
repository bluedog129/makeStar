import { HeaderContainer, TitleWrapper, AlbumManageButton } from '../styles/Header.styles';

const Header = () => {
  return (
    <HeaderContainer>
      <TitleWrapper>
        <h1>앨범</h1>
        <AlbumManageButton>앨범관리</AlbumManageButton>
      </TitleWrapper>
    </HeaderContainer>
  );
};

export default Header;