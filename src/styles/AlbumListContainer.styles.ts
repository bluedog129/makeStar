import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  flex: 1;
  min-height: 0;
  background-color: white;
  overflow-y: auto;
`;

export const SummaryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

export const CountContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const TotalCount = styled.span`
  font-size: 14px;
  color: #6C6C6C;
`;

export const PublishedCount = styled.span`
  font-size: 13px;
  color: #A5A5A5;
  margin-left: 4px;
`;

export const SortButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
`;

export const SortIcon = styled.img`
  width: 16px;
  height: 16px;
`;

export const SortText = styled.span`
  font-size: 14px;
  color: #6C6C6C;
`; 