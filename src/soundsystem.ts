class Sound {
    private audioCtx: AudioContext;
    private nodes: { [id: string]: AudioNode } = {}
    public readonly output: AudioNode;

    constructor() {
        this.audioCtx = (window.AudioContext != null ? new window['AudioContext']() : new window['webkitAudioContext']()) as AudioContext
        this.output = this.audioCtx.destination;
    }


    public resume() {
        console.log("Resume");
        this.audioCtx.resume();
    }

    public getNode(key:string):AudioNode{
        console.log("getNode",key,Object.keys(this.nodes))
        return this.nodes[key];
    }
    public addNode(key:string, create:(AudioContext)=>AudioNode){
        console.log("Add node",key)
        return this.nodes[key] = create(this.audioCtx);
    }
}


export const SOUND = new Sound();

(document.querySelector("body") as HTMLBodyElement).addEventListener("click",()=>SOUND.resume());