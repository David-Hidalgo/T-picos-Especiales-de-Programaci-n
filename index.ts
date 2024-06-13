class Container<T> {
    private _value!:T
    /* private constructor(private readonly value:T) {
        
    } */
    public constructor(val:T){
        this._value=val
    }
    /**
     * of<TVal>
     */
    public static of<TVal>(val:TVal) {
        return new Container(val)     
    }
    /**
     * map<TMap>
     * devuelve un contenedor de TMAP
     */
    public map<TMap>(fn:(entrada:T) =>TMap) {
        return new Container<TMap>(fn(this._value))
    }
    
    public get value() : T {
        return this._value;
    }
    
    /**
     * ap<TMap>
     * devuelve un contenedor de un contenedor de TMAP
     * @returns TMAP
     */
    public ap<TMap>(c:Container<(val:T)=>TMap>) {
        return c.map(fn=>this.map(fn));        
    }
}