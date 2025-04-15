import styled from 'styled-components';
import Topbar from '../components/management/Topbar';
import AlbumListContainer from '../components/management/AlbumListContainer';
import { AppContainer } from '../styles/App.styles';

const ManagementContainer = styled(AppContainer)`
  padding: 0;
  background-color: white;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const AlbumManagement = () => {
  return (
    <ManagementContainer>
      <ContentContainer>
        <Topbar />
        <AlbumListContainer />
      </ContentContainer>
    </ManagementContainer>
  );
};

export default AlbumManagement; 