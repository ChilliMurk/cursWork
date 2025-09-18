import {Global, css} from '@emotion/react';

import {colors, mainFont} from "./StyleConstants";

export const GlobalStyles = () => (
    <>
        <Global
            styles={css`
                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;

                    &::-webkit-outer-spin-button,
                    &::-webkit-inner-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                    }

                    &[type='number'] {
                        -moz-appearance: textfield;
                    }
                }

                body, button {
                    position: relative;
                    font-family: ${mainFont};
                }

                a {
                    color: ${colors.mainBlue};
                    text-decoration: none;

                    &:hover {
                        text-decoration: none;
                    }
                }

                h1 {
                    font-size: 24px;
                    font-weight: 600;
                }

                h2 {
                    font-size: 20px;
                }

                h3 {
                    font-size: 18px;
                }

                h4 {
                    margin: 0;
                    font-size: 16px;
                    font-weight: 600;
                    color: ${colors.basicText};
                }

                button {
                    font-family: ${mainFont};
                    font-weight: 700;
                }

                form div.ant-form-item-explain .ant-form-item-explain-error:not(:first-of-type) {
                    display: none;
                }

                .ant-select-dropdown {
                    font-size: 16px !important;
                    font-family: ${mainFont};
                }

                .rc-virtual-list-scrollbar {
                    width: 0 !important;
                }

                .digit .ant-select-item {
                    padding: 5px 5px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                }

                .digit .ant-select-item-option-content {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            `}
        />
    </>
);
