class Container<T> {

    public static of<TVal>(val: TVal) {
        return new Container(val);
    }

    private _value!: T;

    public constructor(val: T) {
        this._value = val;
    }

    public map<TMap>(f: (val: T) => TMap) : Container<TMap> {

        //let val : TMap = f(this._value);
        //return new Container<TMap>(val);
        
        return new Container<TMap>(f(this._value));
    }

    public ap<TMap>(c: Container<(val: T) => TMap>) {

        //let fap = (fn: (val: T) => TMap) => this.map(fn);
        //return c.map(fap);
        
        return c.map((fn) => (this.map(fn))); 
    }

    
    //this apunta al objeto, porque usamos arrow function
    //return c.map(function(fn) {this.map(fn)}); //ERROR. La herramienta code actions te dice que lo pases a arrow function
}

let double = (x: number) => x + x;
let numberContainer = Container.of(3);
let functionContainer = Container.of(double);

// Container<number> with value 6
let r1 = numberContainer.map(double);
console.log(r1);

// Container<number> with value 6
let r2 = numberContainer.ap(functionContainer);
console.log(r2);













console.log("******** MayBe ********")

class Nothing<T> {
    public static of<TVal>(val?: TVal) {
        return new Nothing(val);
    }
    
    private _value: T|undefined;
    
    public constructor(val?: T) {
        this._value = val;
    }
    
    public map<TMap>(fn: (val: T) => TMap) {
        if (this._value !== undefined) { 
            return new Nothing<TMap>(fn(this._value));
        } else {
            return new Nothing<TMap>(this._value as any);
        }
    }
}

class MayBe<T> {
    public static of<TVal>(val?: TVal) {
        return new MayBe(val);
    }
    
    private _value!: T;
    public constructor(val?: T) {
        if (val) {
            this._value = val;
        }
    }
    
    public isNothing() {
        return (this._value === null || this._value === undefined);
    }

    public map<TMap>(fn: (val: T) => TMap) {
        if (this.isNothing()) {
            return new MayBe<TMap>();
        } else {
            return new MayBe<TMap>(fn(this._value));
        }
    }
    
    public ap<TMap>(c: MayBe<(val: T) => TMap>) {
        return c.map(fn => this.map(fn));
    } 

    public join() {
        return this.isNothing() ? Nothing.of(this._value) : this._value;
    }
    
    public chain<TMap>(fn: (val: T) => TMap) {
        return this.map(fn).join();
    }
}



console.log("******** Pruebas varias ********")

//Named and anonymous functions
//Keep in mind that the arrow function (=>) syntax changes the way the this operator works when working with classes. We will learn more about this in upcoming chapters.
//an arrow function expression lexically binds the value of the this operator. This means that it allows us to add a function without altering the value of this operator.


//let doblar = (x: number) => x + 1;
function sumar(x: number) {
    let f1 = (y: number) => y + x; 
    let f2 = y => y + x; 
    //POR QUE DEBO HACER EXPLICITO EL TIPO DE Y??
    //Porque su tipo no se puede inferir el tipo en tiempo de compilación, a pesar de tener la +
    return f2(f1(5));
}
console.log(sumar(3));

function ap(f: (x: number) => number){
  return f(5);
}
function ap2(){
  //ACA SI SE INFIERE PORQUE SI SE SABE EL TIPO DE X por la firma de AP
  return ap(x => x+x);
}
console.log(ap2());

//a rest parameter must be of an array type / variable number of arguments, known as variadic functions
function addMany(...numbers: number[]) {
    return numbers.reduce((p, c) => p + c, 0);
}

console.log(addMany(1,2,4)); // 15

let greetUnnamed: (name: string) => string;
greetUnnamed = (name: string) => `Hello ${name}`;
greetUnnamed = (p: string) => `Hello ${p}`;
greetUnnamed = (p: unknown) => `Hello ${p}`;
greetUnnamed = (p: any) => `Hello ${p}`;
greetUnnamed = (p: string) => {}; //void 
greetUnnamed = (p: never) => `Hello ${p}`;
greetUnnamed = (p: void) => `Hello ${p}`;
greetUnnamed = (p: number) => `Hello ${p}`;
greetUnnamed = (p: boolean) => `Hello ${p}`;

//On the other hand, the function expression is part of an assignment and will not be evaluated until the assignment has been completed.Fortunately, the TypeScript compiler can detect this error and throw a compilation-time error. However, if we compile the preceding TypeScript code snippet into JavaScript, ignore the compilation errors, and try to execute it in a web browser, we will observe that the first console.log call works. This is the case because JavaScript knows about the declaration function and can parse it before the program is executed. The primary cause of the different behavior of these functions is a process known as variable hoisting.
console.log(greetNamed2("John")); // OK
// Error. Lanza excepción: ReferenceError: Cannot access 'greetUnnamed2' before initialization
//The exception is thrown because the greetUnnamed assignment must be completed before the function can be evaluated.

//console.log(greetUnnamed2("John")); 
function greetNamed2(name: string): string {
       return `Hi! ${name}`;
}
let greetUnnamed2 = function(name: string): string {
       return `Hi! ${name}`;
};


//let and const. 
//OJO entender diferencia entre "cannot be reassigned" vs inmutable (cannot be modified)
//Variables declared with the const keyword cannot be reassigned, but are not immutable. When we say that a variable is immutable, we mean that it cannot be modified.
function foo(): void {
    if (true) {
        const bar: number = 0;
        bar = 1; // Error
    }
    alert(bar); // Error
}


//https://medium.com/@bobjunior542/how-to-use-the-operator-in-typescript-for-cleaner-more-efficient-code-7fd528f8f8b1
//The ! operator is a type assertion operator that tells the TypeScript compiler that a variable or property is not null or undefined, and it should be treated as such. By using the ! operator, you are telling the compiler that you are certain that the value is not null or undefined, and you want to avoid a compilation error.