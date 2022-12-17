import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { mouseSelect, Node, drag, RootState } from "../state/store";
import { NodeElem } from "./node";

export function Base() {
    let nodes = useSelector((state: RootState) => state.main.nodes) as Node[];
    // let dragTarget= useSelector((state: RootState) => state.main.dragTarget);
    let offset = useSelector((state: RootState) => state.main.offset);
    const dispatch = useDispatch();


    const transform = `translate(${offset[0]},${offset[1]})`

    return <svg width="100" height="100"
        onMouseDown={evt => dispatch(mouseSelect({ type: "everything" }))}
        onMouseUp={evt => dispatch(mouseSelect(null))}
        onMouseMove={evt => dispatch(drag([evt.movementX,evt.movementY]))}
        style={{ backgroundPosition: `${offset[0]}px ${offset[1]}px` }}>
        <g transform={transform}>
            {nodeElems(nodes)}
        </g>
    </svg>

}

function nodeElems(nodes: Node[]) {
    return nodes.map((n, i) => {
        return <NodeElem data={n} key={i} idx={i}/>
    });
}
