import React from "react";
import { createRoot } from "react-dom/client"; // Импортируем createRoot

import App from "./components/app/app";

const root = createRoot(document.querySelector("body"));
root.render(<App />);
