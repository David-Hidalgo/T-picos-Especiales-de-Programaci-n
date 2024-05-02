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