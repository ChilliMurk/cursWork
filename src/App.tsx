import {MainPage} from "./common/components/mainPage/MainPage";
import {GlobalStyles} from "./common/styles/GlobalStyles";
import {RoutesProvider} from "./router/RoutesProvider";
import styled from "@emotion/styled";


const StyledApp = styled('div')`
    height: 100vh;
    display: flex;
`

const App = () => {
    return (
        <StyledApp>
            <GlobalStyles/>
            <RoutesProvider/>
            <MainPage/>
        </StyledApp>
    );
};

export default App;
