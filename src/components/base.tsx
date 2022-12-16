import * as React from "react";
import { useSelector } from "react-redux";
import { Node, RootState } from "../state/store";
import { NodeElem } from "./node";

export function Base() {
    let nodes = useSelector((state: RootState) => state.main.nodes) as Node[];

    return <svg width="100" height="100">
        {nodeElems(nodes)}
    </svg>

}

function nodeElems(nodes: Node[]) {
    return nodes.map((n, i) => {
        return <NodeElem data={n} key={i}/>
    });
}

/*
Node size, inputs and outputs, and controls should come from NodeTempaltes
*/