import { configureStore, createSlice } from '@reduxjs/toolkit'
export type Node = {
    x: number,
    y: number,
    id: number,
    template: string,
    controlValues: any[]
}

export type Selected = { type: "everything" } | { type: "node", idx: number } | {type:'wire',nodeIdx:number,isInput:boolean,ioIdx:number};

export type MainState = {
    nodes: Node[],
    dragTarget:  Selected| null,
    offset: number[],
    mousePos: number[],
    wires: {outNode:number, outIdx:number, inNode:number, inIdx:number}[]
}

export type RootState = {
    main: MainState
}

const mainSlice = createSlice({
    name: "main",
    initialState: {
        nodes: [
            {
                x: 10,
                y: 10,
                id: 1,
                template: "gain",
                controlValues: []
            },
            {
                x: 120,
                y: 10,
                id: 1,
                template: "gain",
                controlValues: []
            },
            {
                x: 250,
                y: 300,
                id: 1,
                template: "osc",
                controlValues: [30, "SQR"]
            },
            {
                x: 500,
                y: 300,
                id: 1,
                template: "out"
            }
        ],
        dragTarget: null,
        offset: [0, 0],
        mousePos:[0,0],
        wires: []
    },
    reducers: {
        mouseSelect: (state: MainState, action: { payload: Selected }) => {
            if (state.dragTarget == null || action.payload == null) {
                state.dragTarget = action.payload;
                console.log("Select drag", state.dragTarget)
            }
        },
        drag: (state: MainState, action: { payload: number[] }) => {
            const dragTarget = state.dragTarget;
            if (dragTarget) {
                switch (dragTarget.type) {
                    case "everything":
                        state.offset = [state.offset[0] + action.payload[0], state.offset[1] + action.payload[1]];
                        break;
                    case "node":
                        const n = state.nodes[dragTarget.idx];
                        state.nodes[dragTarget.idx] = {...n,x:n.x+action.payload[0],y:n.y+action.payload[1]}
                }
            }
            state.mousePos = [action.payload[2],action.payload[3]];
        },
        joinWire: (state: MainState, action: { payload: { isInput: boolean, nodeIdx: number, ioIdx: number } }) => {
            // TODO block pluging into yourself, or loops, or connectors that don't support multiple
            if (state.dragTarget && state.dragTarget.type == "wire") {
                if (action.payload.isInput) {
                    state.wires.push({
                        outNode: state.dragTarget.nodeIdx,
                        outIdx: state.dragTarget.ioIdx,
                        inNode: action.payload.nodeIdx,
                        inIdx: action.payload.ioIdx
                    })

                } else {
                    state.wires.push({
                        outNode: action.payload.nodeIdx,
                        outIdx: action.payload.ioIdx,
                        inNode: state.dragTarget.nodeIdx,
                        inIdx: state.dragTarget.ioIdx
                    })
                }
                console.log("WIRE");
            } else {
                console.log("NOWIRE");
            }
        }
    }
});

export default configureStore({
    reducer: {
        main: mainSlice.reducer
    },
});

export const { mouseSelect, drag, joinWire } = mainSlice.actions;
