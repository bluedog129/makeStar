import styled from 'styled-components';

export const AppWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  justify-content: center;
`;

export const AppContainer = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  padding: 0;

  @media ${({ theme }) => theme.mediaQueries.mobile} {
    padding: 0;
  }
`;