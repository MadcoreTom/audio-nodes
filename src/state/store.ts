import { configureStore, createSlice } from '@reduxjs/toolkit'
export type Node = {
    x:number,
    y:number,
    id:number,
    template:string,
    controlValues:any[]
}

export type MainState = {
    nodes: Node[]
}

export type RootState = {
    main: MainState
}

const  mainSlice = createSlice<MainState, {},string>({
    name:"main",
    initialState: {
nodes:[
    {
        x:10,
        y:10,
        id:1,
        template:"gain",
        controlValues:[]
    },
    {
        x:120,
        y:10,
        id:1,
        template:"gain",
        controlValues:[]
    },
    {
        x:250,
        y:300,
        id:1,
        template:"osc",
        controlValues:[30, "SQR"]
    }
]
    },
    reducers :{

    }
});

export default configureStore({
    reducer: {
        main: mainSlice.reducer
    },
});

export  const {} = mainSlice.actions;