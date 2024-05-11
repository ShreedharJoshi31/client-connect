import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Contacts from "./scenes/contacts";
import Form from "./scenes/form";
import UpdateForm from "./scenes/updateForm";
import Login from "./scenes/login";
import Communications from "./scenes/communications";
import SendEmail from "./scenes/sendEmail";
import CreateCommunications from "./scenes/createCommunication";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Provider, useSelector } from "react-redux";
import store from "./app/store";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const { token } = useSelector((state) => state.auth);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {token && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {token && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route
                path="/login"
                element={!token ? <Login /> : <Navigate to="/contacts" />}
              />
              <Route
                path="/contacts"
                element={token ? <Contacts /> : <Navigate to="/login" />}
              />
              <Route
                path="/form"
                element={token ? <Form /> : <Navigate to="/login" />}
              />
              <Route
                path="/update/:id"
                element={token ? <UpdateForm /> : <Navigate to="/login" />}
              />
              <Route
                path="/comms/:id"
                element={token ? <Communications /> : <Navigate to="/login" />}
              />
              <Route
                path="/createComms/:id"
                element={
                  token ? <CreateCommunications /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/sendEmail"
                element={token ? <SendEmail /> : <Navigate to="/login" />}
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
