import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// React Redux Toolkit
import store from "./app/store";
import { Provider } from "react-redux";
// Material UI
import { createTheme, ThemeProvider } from "@mui/material";

// Create Theme
const theme = createTheme({
    palette: {
        primary: {
            light: "#ffb15d",
            main: "#ff802d",
            dark: "#c55100",
            contrastText: "#000000",
        },
        secondary: {
            light: "#76b7ff",
            main: "#2d88ff",
            dark: "#005ccb",
            contrastText: "#000000",
        },
        white: {
            main: "#fff",
            contrastText: "#000",
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <App />
            </Provider>
        </ThemeProvider>
    </React.StrictMode>
);
