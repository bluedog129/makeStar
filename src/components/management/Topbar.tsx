import { useNavigate } from 'react-router-dom';
import {
  TopbarContainer,
  Title,
  CloseButton,
} from '../../styles/Topbar.styles';

const Topbar = () => {
  const navigate = useNavigate();

  return (
    <TopbarContainer>
      <Title>앨범관리</Title>
      <CloseButton onClick={() => navigate('/')} />
    </TopbarContainer>
  );
};

export default Topbar;