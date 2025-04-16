import styled from "styled-components";
import { StyledAlbumProps, AlbumInfoStyleProps, SubInfoStyleProps, CountStyleProps } from "@/types/props";

export const AlbumItemContainer = styled.div`
  width: 100%;
  height: 85px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 16px;
  margin-bottom: 16px;
`;

export const Title = styled.span`
  font-size: 14px;
  color: #000000;
`;

export const SubInfo = styled.div<SubInfoStyleProps>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: ${(props) => (props.$isInactive ? "#A5A5A5" : "#6c6c6c")};
`;

export const Count = styled.span<CountStyleProps>`
  font-size: 11px;
  color: ${(props) => (props.$isInactive ? "#A5A5A5" : "#a5a5a5")};
`;

export const AlbumImage = styled.div<StyledAlbumProps>`
  width: 54px;
  height: 85px;
  overflow: hidden;
  border-radius: 4px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${(props) =>
      props.$isInactive ? "rgba(0, 0, 0, 0.7)" : "transparent"};
  }
`;

export const AlbumInfo = styled.div<AlbumInfoStyleProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;

  ${Title} {
    color: ${(props) => (props.$isInactive ? "#A5A5A5" : "#000000")};
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MenuButton = styled.div`
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  position: relative;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MenuIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const Dot = styled.span`
  color: #6c6c6c;
`;

export const WaitingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-bottom-color: #ff0099;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const WaitingText = styled.span`
  font-size: 11px;
  font-weight: bold;
  color: #6c6c6c;
  display: flex;
  align-items: center;
`; 