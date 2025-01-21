import styled from "styled-components"
import Menu from "./Components/Menu";
import Navbar from "./Components/Navbar";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./Utils/Theme";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Video from "./Pages/Video"
import Signin from "./Pages/Signin"
import Search from "./Pages/Search";
import { useSelector } from "react-redux";
import HIstory from "./Components/HIstory";

const Container = styled.div`
  display: flex;
  padding: 0;
  margin: 0;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  padding: 30px 50px;
`;

function App() {

  const [darkMode, setDarkMode] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route path="/" element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="subscription" element={<Home type="sub" />} />
                  <Route path="search" element={<Search />} />
                  <Route path="history" element={<HIstory />} />
                  <Route
                    path="signin"
                    element={currentUser ? <Home /> : <Signin />}
                  />
                  <Route path="/video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
