import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  height: 56px;
  padding: 8px 0 22px 20px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  h1 {
    font-size: 18px;
    font-weight: 600;
  }
`;

export const AlbumManageButton = styled.div`
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.albumManage.background};
  border: 1px solid ${({ theme }) => theme.colors.albumManage.border};
  cursor: pointer;
`;