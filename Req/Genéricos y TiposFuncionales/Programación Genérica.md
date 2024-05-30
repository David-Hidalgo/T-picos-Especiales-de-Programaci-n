# Programación Genérica(Polimorfismo)

- Polimorfismo de
  - adhomen/Sobrecarga
  - Subtipos
  - Paramétrico

f: String-> string \
g: number-> number | si funciona para todo es ortogonal
h: Curso-> Curso /

- Programación Genérica
  - Dunción Genérica
  - Clase Genérica
  - Interfaz Genérica

```ts
const multiplicar = (a, b) => {
  return a * b;
};
const f = [{ draw: () => {} }, { draw: () => {} }];
```

<> <= Es una notación diamante

\<T> tipo parametrizado

la genérica se define así

```ts
function map<T,U>(T[],f:(item:T=>U):U[]){
    let result:U[]=[];
    for (const item of items){
        result.push(f(item));
    }
    return result
}
```

```ts
function filter<T>(items:T[],pred:(item):T=>boolean):T[]{
    let result:T[]=[];
    for (const item of items){
        if(pred(item)){result result.push(item);}
        result.push(f(item));
    }
    return result;
}

let numeros: number[]=[1,2,3,4,5]
let pares: number[]=[]
filter (numeros,(item)=>item%2==0);
filter (palabra,(item)=>item.lenght()>5);
```
```ts
function reduce<T>(items:T[], init:T,op:(x:T,y:T)=>T):T{
    let resultado:T = init;
    items.forEach(element => {
        resultado=op(resultado, element)
    });
    return resultado
}

reduce<number>([1,2,3,4,5],1,(x:number,y:number)=>{ 
    console.log(x - y);
    return x-y
})
```

<!--MARK: Por Hacer-->

Implementar: 
```ts
all(l:T[],pred:T=>boolean):boolean
first(hagarra el primero que cumple la condición)
```

Implementación
```ts
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
```

## Prog. Genérica
Caso de Uso : Optional<T>
    Problema:
    E.X; <!-- NULLPointerExeption -->
    e.m() <!-- object undefined -->

<!-- Leer libros
    Tipos de datos Abstractos (Algebraicos) cap3(pag 64) -->
    Γ⊢A Γ⊢B
    Γ⊢A|B <!-- Operador en el espacio de los tipos Suma de typos -->
    Γ⊢e:A|B
    Encapsular el  manejo de NULL/undefined
```ts
class Optional<T> {
    private _value:T|undefined
    private assigned:boolean
    
    constructor(value?:T) {
        if (value) {
            this._value = value;
            this.assigned = true;
        } else {
            this._value=undefined;
            this.assigned=false       
        }
    }
    
    public get hasValue() : boolean {
        if (this.assigned) {
            return true
        } else {
            return false
        }
    }
    
    public get value() : T {
        if (!this.assigned) throw new Error("Jodete");
            return (this._value as T)
    }
    
}
```