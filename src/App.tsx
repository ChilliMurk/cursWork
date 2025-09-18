import {GlobalStyles} from "./common/styles/GlobalStyles";
import {RoutesProvider} from "./router/RoutesProvider";
import styled from "@emotion/styled";
import {Provider} from "react-redux";
import {store} from "@/store/store.ts";


const StyledApp = styled('div')`
    height: 100vh;
`

const App = () => {
    return (
        <Provider store={store}>
        <StyledApp>
            <GlobalStyles/>
            <RoutesProvider/>
        </StyledApp>
        </Provider>
    );
};

export default App;
