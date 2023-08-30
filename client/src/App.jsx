import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StartPage from "./pages/StartPage";
import Main from "./components/Main/Main";
import { useChatContext } from "./context/ChatContext";

//here we set up the routing of the application, we add a conditional that chekcs if the user is logged in to get acces to lobby.

function App() {
  const { username } = useChatContext();

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route
            path="/lobby"
            element={username ? <Main /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
