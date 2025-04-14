import { AppContainer } from '../styles/App.styles';
import Header from '../components/Header';
import PocaAlbumContainer from '../components/PocaAlbumContainer';

const MainPage = () => {
  return (
    <AppContainer>
      <Header />
      <PocaAlbumContainer />
    </AppContainer>
  );
};

export default MainPage; 