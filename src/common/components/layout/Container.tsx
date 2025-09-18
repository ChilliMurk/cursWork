import styled from '@emotion/styled';

export const Container = styled('div')`
  width: 100%;
`;

export const FlexContainer = styled(Container)<{ $justify?: 'center' | 'space-between' }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.$justify || 'unset'};
`;
