import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {outletMarginTop} from "../../common/styles/StyleConstants";

export const verShadowSpacing = css`
  padding-block: 5px;
`;

export const horShadowSpacing = css`
  padding-inline: 5px;
  margin-inline: -5px;
`;

export const commonWrapperStyles = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 0;
`;

export const CommonWrapper = styled('div')`
  ${commonWrapperStyles}
`;

export const CommonShadowWrapper = styled('div')`
  ${commonWrapperStyles}
  ${horShadowSpacing}
`;

export const OutletWrapper = styled(CommonWrapper)<{ $marginTop?: number }>`
  padding-top: ${(props) => (props.$marginTop ? props.$marginTop + 'px' : outletMarginTop)};
`;

export const ListWrapper = styled('div')`
  overflow-y: auto;
  ${horShadowSpacing}
  ${verShadowSpacing}
`;
