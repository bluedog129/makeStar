import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import closeIcon from '../../assets/images/close.png';

const TopbarContainer = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 10px 15px 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  line-height: 34px;
`;

const CloseButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  width: 34px;
  height: 34px;
  background-image: url(${closeIcon});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

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