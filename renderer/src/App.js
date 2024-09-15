import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes/routes";
import { GlobalStyle } from "./GlobalStyle";
function App() {
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
    </>
  );
}

export default App;
