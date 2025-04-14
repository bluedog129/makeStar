import React from 'react';
import { AppWrapper, AppContainer } from './styles/App.styles';
import Header from './components/Header';
import PocaAlbumContainer from './components/PocaAlbumContainer';

function App() {
  return (
    <AppWrapper>
      <AppContainer>
        <Header />
        <PocaAlbumContainer />
      </AppContainer>
    </AppWrapper>
  );
}

export default App;