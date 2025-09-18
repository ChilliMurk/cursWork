import { SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import {pageContainerPadding, pageContainerWidth} from "../../styles/StyleConstants";

/**
 * Контейнер для выравнивания содержимого на широкоформатных мониторах.
 * Нужен для выравнивания контента по отдельности с целью растянуть на всю ширину экрана
 * контейнеры с прокруткой. Это нужно для того, чтобы прокрутка работала не только при наведении
 * курсора на прокручиваемый список, но и при наведении курсора на пустую область рядом с ним.
 */
export const AlignContentContainer = styled('div')<{ customStyles?: SerializedStyles }>`
  max-width: ${pageContainerWidth};
  width: min(${pageContainerWidth}, 100%);
  padding-inline: ${pageContainerPadding};
  margin: 0 auto;
  ${(props) => props.customStyles}
`;

/**
 * Контейнер для оборачивания скроллируемого контента в случае необходимости.
 * Для вложенного прокручиваемого контейнера нужно задать ширину 'pageContainerWidth'
 * для корректной прокрутки.
 */
export const AlignScrollableContentContainer = styled(AlignContentContainer)`
  width: inherit;
`;
