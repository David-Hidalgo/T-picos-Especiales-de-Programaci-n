console.log("Hello via Bun!");



class Box<T> {
    #inicial:T;
    constructor(contenido:T) {
        this.#inicial=contenido;
    }
    
    public get contenido() : T {
        return this.#inicial
    }
    
}

const name = new Box(1);
console.log(name.contenido);

let b:boolean

function all<T>(contenedor:T[],pred:(a:T)=>boolean):boolean{
    for (let i=0;i<contenedor.length;i++){
        if (!pred(contenedor[i])){
            return false;
        }
    }
    return true;
}

function first<T>(contenedor:T[],pred:(a:T)=>boolean):T|void{
    contenedor.forEach(element => {
        if (pred(element)) {
            return element;
        }
    });
}

