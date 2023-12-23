import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./assets/styles/styles.css";

const rootEl = document.querySelector("#root");
if (rootEl === null) throw new Error("Can not find root element");
const root = createRoot(rootEl);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*
I need to have main page
Shopping page i guess
somehow i need to display on the right side of page the elements in the cart - later
Use react router	- done
test everything with jest + react-testing-lib - todo
Use css modules - todo
Read how to fetch data ! - done
1. Index page
2. Shopping page
3. Cart display (side of page / new page)
4. Checkout page
Make it look like normal page pls Szymek you can do this 
*/
