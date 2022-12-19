class Sound {
    private audioCtx: AudioContext;
    private nodes: { [id: string]: AudioNode } = {}
    private subscriptions: {[id:string]:((time:number)=>void)[]} = {}
    public readonly output: AudioNode;

    constructor() {
        this.audioCtx = (window.AudioContext != null ? new window['AudioContext']() : new window['webkitAudioContext']()) as AudioContext
        this.output = this.audioCtx.destination;
    }


    public resume() {
        this.audioCtx.resume();
    }

    public getNode(key:string):AudioNode{
        return this.nodes[key];
    }
    public addNode(key:string, create:(ctx:AudioContext)=>AudioNode){
        console.log("Add node",key)
        return this.nodes[key] = create(this.audioCtx);
    }

    public now():number{
        return this.audioCtx.currentTime;
    }

    public trigger(name:string, time:number){
        const subs = this.subscriptions[name];
        console.log("Triggering for ", name, subs)
        if(subs){
            subs.forEach(s=>s(time));
        }
    }

    public subscribe(name:string, callback: (time:number)=>void){
        let subs = this.subscriptions[name];
        console.log("Sbuscribubled to", name)
        if(!subs){
            subs = [];
        }
        subs.push(callback);
        this.subscriptions[name] = subs
    }
}


export const SOUND = new Sound();

(document.querySelector("body") as HTMLBodyElement).addEventListener("click",()=>SOUND.resume());