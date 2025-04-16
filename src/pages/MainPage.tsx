import { AppContainer } from '../styles/App.styles';
import Header from '../components/mainPage/Header';
import PocaAlbumContainer from '../components/mainPage/PocaAlbumContainer';

const MainPage = () => {
  return (
    <AppContainer>
      <Header />
      <PocaAlbumContainer />
    </AppContainer>
  );
};

export default MainPage; 