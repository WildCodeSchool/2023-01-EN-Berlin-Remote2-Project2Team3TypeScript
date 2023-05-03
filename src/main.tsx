import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./global.css"

const rootElement = document.getElementById("root");

if(rootElement === null)  {
    throw Error ('no root element in index.html!');
} else {
    ReactDOM.createRoot(rootElement).render(<App />);
}