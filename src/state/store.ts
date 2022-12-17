import { configureStore, createSlice } from '@reduxjs/toolkit'
export type Node = {
    x: number,
    y: number,
    id: number,
    template: string,
    controlValues: any[]
}

export type MainState = {
    nodes: Node[],
    dragTarget: { type: "everything" } | { type: "node", idx: number } | null,
    offset: number[]
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
            }
        ],
        dragTarget: null,
        offset: [0, 0]
    },
    reducers: {
        mouseSelect: (state: MainState, action: { payload: any }) => {
            if (state.dragTarget == null || action.payload == null) {
                state.dragTarget = action.payload;
            }
            console.log("Select drag", state.dragTarget)
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
        }
    }
});

export default configureStore({
    reducer: {
        main: mainSlice.reducer
    },
});

export const { mouseSelect, drag } = mainSlice.actions;
