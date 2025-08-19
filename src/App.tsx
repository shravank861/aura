import React from 'react';
import styled from 'styled-components';
import NoCodeEditor from './components/NoCodeEditor';
import { GlobalStyle } from './styles/global';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

function App() {
  return (
    <AppContainer>
      <GlobalStyle />
      <NoCodeEditor />
    </AppContainer>
  );
}

export default App;
