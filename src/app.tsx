import * as React from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'
import { Base } from "./components/base";
import store, { addNode } from "./state/store";
import { useDispatch } from "react-redux";



function App() {

    return <div className="main">
        <Base/>
        <Controls/>
    </div>
}


createRoot(document.querySelector("#root") as HTMLElement)
    .render(<Provider store={store}><App /></Provider>,);

function Controls(){
    
    const dispatch = useDispatch();

    return <div style={{background:"green"}}>
        <button onClick={()=>dispatch(addNode({template:"gain"}))}>Gain</button>
        <button onClick={()=>dispatch(addNode({template:"LFO"}))}>Osc Low</button>
        <button onClick={()=>dispatch(addNode({template:"HFO"}))}>Osc High</button>
        <button onClick={()=>dispatch(addNode({template:"out"}))}>Out</button>
        <button onClick={()=>dispatch(addNode({template:"pad"}))}>Pad</button>
        <button onClick={()=>dispatch(addNode({template:"env"}))}>Envelope</button>
    </div>
}