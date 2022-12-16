import * as React from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'
import { Base } from "./components/base";
import store from "./state/store";



function App() {

    return <div className="main">
        <Base/>
    </div>
}


createRoot(document.querySelector("#root") as HTMLElement)
    .render(<Provider store={store}><App /></Provider>,);