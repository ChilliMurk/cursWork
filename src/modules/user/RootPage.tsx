import styled from '@emotion/styled';
import {ReactNode} from 'react';
import {commonWrapperStyles} from "./Wrapper";

const Container = styled('div')`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
`;

const Wrapper = styled(Container)`
    ${commonWrapperStyles}
`;

export const RootPage = ({children}: { children: ReactNode }) => <Wrapper>{children}</Wrapper>;
